$(document).ready(function () {

    const ownerID = sessionStorage.getItem("userID");

    let editingPropertyID = null;
    let currentImage = "";

    if (!ownerID) {
        window.location.href = "login.html";
        return;
    }

    loadProperties();

    $("#showPropertyForm").click(function () {
        $("#propertyFormCard").slideToggle();
    });

    // =========================
    // SAVE / UPDATE PROPERTY
    // =========================

    $("#saveProperty").click(function () {

        if (
            $("#propertyName").val() === "" ||
            $("#propertyLocation").val() === "" ||
            $("#propertyPrice").val() === ""
        ) {
            alert("Please complete all required fields.");
            return;
        }

        const formData = new FormData();

        formData.append("owner_id", ownerID);
        formData.append("name", $("#propertyName").val());
        formData.append("location", $("#propertyLocation").val());
        formData.append("description", $("#propertyDescription").val());
        formData.append("price", $("#propertyPrice").val());
        formData.append("facilities", $("#propertyFacilities").val());

        formData.append("rating", 0);
        formData.append("ideal_for", "");
        formData.append("map", "");
        formData.append("status", "Available");
        formData.append("oldImage", currentImage);

        const imageFile = $("#propertyImage")[0].files[0];

        if (imageFile) {
            formData.append("image", imageFile);
        }

        let url = "http://localhost:3000/api/accommodation/add";
        let method = "POST";

        if (editingPropertyID !== null) {
            url = `http://localhost:3000/api/accommodation/${editingPropertyID}`;
            method = "PUT";
        }

        $.ajax({

            url: url,
            method: method,
            data: formData,
            processData: false,
            contentType: false,

            success: function (response) {

                if (!response.success) {
                    alert(response.message || "Operation failed.");
                    return;
                }

                alert(
                    editingPropertyID === null
                        ? "Property added successfully!"
                        : "Property updated successfully!"
                );

                clearForm();

                loadProperties();

            },

            error: function () {

                alert("Something went wrong.");

            }

        });

    });

    // =========================
    // LOAD OWNER PROPERTIES
    // =========================

    function loadProperties() {

        $.get(

            `http://localhost:3000/api/accommodation/owner/${ownerID}`,

            function (response) {

                $("#propertiesContainer").html("");

                if (!response.success || response.accommodation.length === 0) {

                    $("#propertiesContainer").html(`

                        <div class="text-center mt-5">

                            <i class="bi bi-building fs-1"></i>

                            <h3>No Properties Yet</h3>

                            <p>Add your first property.</p>

                        </div>

                    `);

                    return;

                }

                response.accommodation.forEach(function (property) {

                    $("#propertiesContainer").append(`

                        <div class="property-card">

                            <img src="http://localhost:3000/uploads/accommodation/${property.image}" class="img-fluid">

                            <div class="p-3">

                                <h3>${property.name}</h3>

                                <p>
                                    <i class="bi bi-geo-alt-fill"></i>
                                    ${property.location}
                                </p>

                                <p>
                                    <strong>$${property.price}</strong> / night
                                </p>

                                <p>${property.facilities || ""}</p>

                                <div class="mt-3 d-flex gap-2">

                                    <button
                                        class="btn btn-warning editProperty"
                                        data-id="${property.id}">
                                        Edit
                                    </button>

                                    <button
                                        class="btn btn-danger deleteProperty"
                                        data-id="${property.id}">
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    `);

                });

            }

        );

    }

    // =========================
    // DELETE PROPERTY
    // =========================

    $(document).on("click", ".deleteProperty", function () {

        if (!confirm("Delete this property?")) return;

        const id = $(this).data("id");

        $.ajax({

            url: `http://localhost:3000/api/accommodation/${id}`,
            method: "DELETE",

            success: function (response) {

                if (response.success) {

                    loadProperties();

                }

            }

        });

    });

    // =========================
    // EDIT PROPERTY
    // =========================

    $(document).on("click", ".editProperty", function () {

        const id = $(this).data("id");

        $.get(

            `http://localhost:3000/api/accommodation/owner/${ownerID}`,

            function (response) {

                if (!response.success) return;

                const property = response.accommodation.find(p => p.id == id);

                if (!property) return;

                editingPropertyID = property.id;
                currentImage = property.image;

                $("#propertyName").val(property.name);
                $("#propertyLocation").val(property.location);
                $("#propertyPrice").val(property.price);
                $("#propertyDescription").val(property.description);
                $("#propertyFacilities").val(property.facilities);

                $("#saveProperty").text("Update Property");

                $("#propertyFormCard").slideDown();

            }

        );

    });

    // =========================
    // CLEAR FORM
    // =========================

    function clearForm() {

        editingPropertyID = null;
        currentImage = "";

        $("#propertyName").val("");
        $("#propertyLocation").val("");
        $("#propertyPrice").val("");
        $("#propertyDescription").val("");
        $("#propertyFacilities").val("");
        $("#propertyImage").val("");

        $("#saveProperty").text("Save Property");

        $("#propertyFormCard").slideUp();

    }

});