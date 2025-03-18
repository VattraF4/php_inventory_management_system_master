var manageProductTable;
// product data table
$(document).ready(function () {
	// top nav bar 
	$('#navProduct').addClass('active');
	// manage product data table
	manageProductTable = $('#manageProductTable').DataTable({
		'ajax': 'php_action/fetchProduct.php',
		'order': []
	});

	// add product modal btn clicked
	$("#addProductModalBtn").unbind('click').bind('click', function () {
		// // product form reset
		$("#submitProductForm")[0].reset();

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		$("#productImage").fileinput({
			overwriteInitial: true,
			maxFileSize: 2500,
			showClose: false,
			showCaption: false,
			browseLabel: '',
			removeLabel: '',
			browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
			removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
			removeTitle: 'Cancel or reset changes',
			elErrorContainer: '#kv-avatar-errors-1',
			msgErrorClass: 'alert alert-block alert-danger',
			defaultPreviewContent: '<img src="assests/images/photo_default.png" alt="Profile Image" style="width:100%;">',
			layoutTemplates: { main2: '{preview} {remove} {browse}' },
			allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
		});

		// submit product form
		$("#submitProductForm").unbind('submit').bind('submit', function () {

			// form validation
			var productImage = $("#productImage").val();
			var partNumber = $("#partNumber").val();
			var productName = $("#productName").val();
			var quantity = $("#quantity").val();
			var price = $("#price").val();
			var brandName = $("#brandName").val();
			var categoryName = $("#categoryName").val();
			var productStatus = $("#productStatus").val();

			if (productImage == "") {
				$("#productImage").closest('.center-block').after('<p class="text-danger">Product Image field is required</p>');
				$('#productImage').closest('.form-group').addClass('has-error');
			} else {
				// remov error text field
				$("#productImage").find('.text-danger').remove();
				// success out for form 
				$("#productImage").closest('.form-group').addClass('has-success');
			}	// /else

			if (productName == "") {
				$("#productName").after('<p class="text-danger">Product Name field is required</p>');
				$('#productName').closest('.form-group').addClass('has-error');
			} else {
				// remov error text field
				$("#productName").find('.text-danger').remove();
				// success out for form 
				$("#productName").closest('.form-group').addClass('has-success');
			}	// /else

			if (partNumber == "") {
				$("#partNumber").after('<p class="text-danger">Part Number field is required</p>');
				$('#partNumber').closest('.form-group').addClass('has-error');
			} else {
				// remov error text field
				$("#partNumber").find('.text-danger').remove();
				// success out for form 
				$("#partNumber").closest('.form-group').addClass('has-success');
			}	// /else

			if (quantity == "") {
				$("#quantity").after('<p class="text-danger">Quantity field is required</p>');
				$('#quantity').closest('.form-group').addClass('has-error');
			} else {
				// remov error text field
				$("#quantity").find('.text-danger').remove();
				// success out for form 
				$("#quantity").closest('.form-group').addClass('has-success');
			}	// /else

			if (price == "") {
				$("#price").after('<p class="text-danger">Price field is required</p>');
				$('#price').closest('.form-group').addClass('has-error');
			} else {
				// remov error text field
				$("#price").find('.text-danger').remove();
				// success out for form 
				$("#price").closest('.form-group').addClass('has-success');
			}	// /else

			if (brandName == "") {
				$("#brandName").after('<p class="text-danger">Brand Name field is required</p>');
				$('#brandName').closest('.form-group').addClass('has-error');
			} else {
				// remov error text field
				$("#brandName").find('.text-danger').remove();
				// success out for form 
				$("#brandName").closest('.form-group').addClass('has-success');
			}	// /else

			if (categoryName == "") {
				$("#categoryName").after('<p class="text-danger">Category Name field is required</p>');
				$('#categoryName').closest('.form-group').addClass('has-error');
			} else {
				// remov error text field
				$("#categoryName").find('.text-danger').remove();
				// success out for form 
				$("#categoryName").closest('.form-group').addClass('has-success');
			}	// /else

			if (productStatus == "") {
				$("#productStatus").after('<p class="text-danger">Product Status field is required</p>');
				$('#productStatus').closest('.form-group').addClass('has-error');
			} else {
				// remov error text field
				$("#productStatus").find('.text-danger').remove();
				// success out for form 
				$("#productStatus").closest('.form-group').addClass('has-success');
			}	// /else

			if (productImage && productName && partNumber && quantity && price && brandName && categoryName && productStatus) {
				// submit loading button
				$("#createProductBtn").button('loading');

				var form = $(this);
				var formData = new FormData(this);

				$.ajax({
					url: form.attr('action'),
					type: form.attr('method'),
					data: formData,
					dataType: 'json',
					cache: false,
					contentType: false,
					processData: false,
					success: function (response) {

						if (response.success == true) {
							// submit loading button
							$("#createProductBtn").button('reset');

							$("#submitProductForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({ scrollTop: '0' }, 100);

							// shows a successful message after operation
							$('#add-product-messages').html('<div class="alert alert-success">' +
								'<button type="button" class="close" data-dismiss="alert">&times;</button>' +
								'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ' + response.messages +
								'</div>');

							// remove the mesages
							$(".alert-success").delay(500).show(10, function () {
								$(this).delay(3000).hide(10, function () {
									$(this).remove();
								});
							}); // /.alert

							// reload the manage student table
							manageProductTable.ajax.reload(null, true);

							// remove text-error 
							$(".text-danger").remove();
							// remove from-group error
							$(".form-group").removeClass('has-error').removeClass('has-success');

						} // /if response.success

					} // /success function
				}); // /ajax function
			}	 // /if validation is ok 					

			return false;
		}); // /submit product form

	}); // /add product modal btn clicked


	// remove product 	

}); // document.ready fucntion

//test debug
function editProduct(productId) {
    console.log("Editing product: " + productId);
    if (!productId) {
        alert("Error: Product ID is missing!");
        return;
    }

    $.ajax({
        url: 'php_action/fetchSelectedProduct.php',
        type: 'post',
        data: { productId: productId },
        dataType: 'json',
        success: function(response) {
            console.log("Product Data: ", response);
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error:", error);
        }
    });
}


// edit product
function editProduct(productId = null) {
	console.log('productId = ' + productId);

	if (productId) {
		console.log(productId);
		$("#productId").remove();
		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');
		// modal spinner
		$('.div-loading').removeClass('div-hide');
		// modal div
		$('.div-result').addClass('div-hide');

		$.ajax({
			url: 'php_action/fetchSelectedProduct.php',
			type: 'post',
			data: { productId: productId },
			dataType: 'json',
			success: function (response) {
				// alert(response.product_image);
				// modal spinner
				$('.div-loading').addClass('div-hide');
				// modal div
				$('.div-result').removeClass('div-hide');

				$("#getProductImage").attr('src', 'stock/' + response.product_image);

				$("#editProductImage").fileinput({
				});

				// $("#editProductImage").fileinput({
				//     overwriteInitial: true,
				//    maxFileSize: 2500,
				//    showClose: false,
				//    showCaption: false,
				//    browseLabel: '',
				//    removeLabel: '',
				//    browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
				//    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
				//    removeTitle: 'Cancel or reset changes',
				//    elErrorContainer: '#kv-avatar-errors-1',
				//    msgErrorClass: 'alert alert-block alert-danger',
				//    defaultPreviewContent: '<img src="stock/'+response.product_image+'" alt="Profile Image" style="width:100%;">',
				//    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
				// 		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
				// });  

// Append product ID to the form
$(".editProductFooter").append('<input type="hidden" name="productId" id="productId" value="' + response.product_id + '" />');
$(".editProductPhotoFooter").append('<input type="hidden" name="productId" id="productId" value="' + response.product_id + '" />');
				// product name
				$("#editProductName").val(response.product_name);
				//part number
				$("#editPartNumber").val(response.part_number);
				// quantity
				$("#editQuantity").val(response.quantity);
				// price
				$("#editPrice").val(response.price);
				// brand name
				$("#editBrandName").val(response.brand_id);
				// category name
				$("#editCategoryName").val(response.categories_id);
				// status
				$("#editProductStatus").val(response.active);

				// update the product data function
				$("#editProductForm").unbind('submit').bind('submit', function () {

					// form validation
					var productImage = $("#editProductImage").val();
					var partNumber = $("#editPartNumber").val();
					var productName = $("#editProductName").val();
					var quantity = $("#editQuantity").val();
					var price = $("#editPrice").val();
					var brandName = $("#editBrandName").val();
					var categoryName = $("#editCategoryName").val();
					var productStatus = $("#editProductStatus").val();


					if (productName == "") {
						$("#editProductName").after('<p class="text-danger">Product Name field is required</p>');
						$('#editProductName').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editProductName").find('.text-danger').remove();
						// success out for form 
						$("#editProductName").closest('.form-group').addClass('has-success');
					}	// /else

					if (partNumber == "") {
						$("#editPartNumber").after('<p class="text-danger">Part Number field is required</p>');
						$('#editPartNumber').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editPartNumber").find('.text-danger').remove();
						// success out for form 
						$("#editPartNumber").closest('.form-group').addClass('has-success');
					}	// /else

					if (quantity == "") {
						$("#editQuantity").after('<p class="text-danger">Quantity field is required</p>');
						$('#editQuantity').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editQuantity").find('.text-danger').remove();
						// success out for form 
						$("#editQuantity").closest('.form-group').addClass('has-success');
					}	// /else

					if (price == "") {
						$("#editPrice").after('<p class="text-danger">Price field is required</p>');
						$('#editPrice').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editPrice").find('.text-danger').remove();
						// success out for form 
						$("#editPrice").closest('.form-group').addClass('has-success');
					}	// /else

					if (brandName == "") {
						$("#editBrandName").after('<p class="text-danger">Brand Name field is required</p>');
						$('#editBrandName').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editBrandName").find('.text-danger').remove();
						// success out for form 
						$("#editBrandName").closest('.form-group').addClass('has-success');
					}	// /else

					if (categoryName == "") {
						$("#editCategoryName").after('<p class="text-danger">Category Name field is required</p>');
						$('#editCategoryName').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editCategoryName").find('.text-danger').remove();
						// success out for form 
						$("#editCategoryName").closest('.form-group').addClass('has-success');
					}	// /else

					if (productStatus == "") {
						$("#editProductStatus").after('<p class="text-danger">Product Status field is required</p>');
						$('#editProductStatus').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editProductStatus").find('.text-danger').remove();
						// success out for form 
						$("#editProductStatus").closest('.form-group').addClass('has-success');
					}	// /else					

					if (productName && partNumber && quantity && price && brandName && categoryName && productStatus) {
						// submit loading button
						$("#editProductBtn").button('loading');

						var form = $(this);
						var formData = new FormData(this);

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: formData,
							dataType: 'json',
							cache: false,
							contentType: false,
							processData: false,
							success: function (response) {
								console.log(response);
								if (response.success == true) {
									// submit loading button
									$("#editProductBtn").button('reset');

									$("html, body, div.modal, div.modal-content, div.modal-body").animate({ scrollTop: '0' }, 100);

									// shows a successful message after operation
									$('#edit-product-messages').html('<div class="alert alert-success">' +
										'<button type="button" class="close" data-dismiss="alert">&times;</button>' +
										'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ' + response.messages +
										'</div>');

									// remove the mesages
									$(".alert-success").delay(500).show(10, function () {
										$(this).delay(3000).hide(10, function () {
											$(this).remove();
										});
									}); // /.alert

									// reload the manage student table
									manageProductTable.ajax.reload(null, true);

									// remove text-error 
									$(".text-danger").remove();
									// remove from-group error
									$(".form-group").removeClass('has-error').removeClass('has-success');

								} // /if response.success

							} // /success function
						}); // /ajax function
					}	 // /if validation is ok 					

					return false;
				}); // update the product data function

				// update the product image				
				$("#updateProductImageForm").unbind('submit').bind('submit', function () {
					// form validation
					var productImage = $("#editProductImage").val();

					if (productImage == "") {
						$("#editProductImage").closest('.center-block').after('<p class="text-danger">Product Image field is required</p>');
						$('#editProductImage').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editProductImage").find('.text-danger').remove();
						// success out for form 
						$("#editProductImage").closest('.form-group').addClass('has-success');
					}	// /else

					if (productImage) {
						// submit loading button
						$("#editProductImageBtn").button('loading');

						var form = $(this);
						var formData = new FormData(this);

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: formData,
							dataType: 'json',
							cache: false,
							contentType: false,
							processData: false,
							success: function (response) {

								if (response.success == true) {
									// submit loading button
									$("#editProductImageBtn").button('reset');

									$("html, body, div.modal, div.modal-content, div.modal-body").animate({ scrollTop: '0' }, 100);

									// shows a successful message after operation
									$('#edit-productPhoto-messages').html('<div class="alert alert-success">' +
										'<button type="button" class="close" data-dismiss="alert">&times;</button>' +
										'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ' + response.messages +
										'</div>');

									// remove the mesages
									$(".alert-success").delay(500).show(10, function () {
										$(this).delay(3000).hide(10, function () {
											$(this).remove();
										});
									}); // /.alert

									// reload the manage student table
									manageProductTable.ajax.reload(null, true);

									$(".fileinput-remove-button").click();

									$.ajax({
										url: 'php_action/fetchProductImageUrl.php?i=' + productId,
										type: 'post',
										success: function (response) {
											$("#getProductImage").attr('src', response);
										}
									});

									// remove text-error 
									$(".text-danger").remove();
									// remove from-group error
									$(".form-group").removeClass('has-error').removeClass('has-success');

								} // /if response.success

							} // /success function
						}); // /ajax function
					}	 // /if validation is ok 					

					return false;
				}); // /update the product image

			} // /success function
		}); // /ajax to fetch product image


	} else {
		alert('error please refresh the page');
	}
} // /edit product function

// remove product 
function removeProduct(productId = null) {
	if (productId) {
		// remove product button clicked
		$("#removeProductBtn").unbind('click').bind('click', function () {
			// loading remove button
			$("#removeProductBtn").button('loading');
			$.ajax({
				url: 'php_action/removeProduct.php',
				type: 'post',
				data: { productId: productId },
				dataType: 'json',
				success: function (response) {
					// loading remove button
					$("#removeProductBtn").button('reset');
					if (response.success == true) {
						// remove product modal
						$("#removeProductModal").modal('hide');

						// update the product table
						manageProductTable.ajax.reload(null, false);

						// remove success messages
						$(".remove-messages").html('<div class="alert alert-success">' +
							'<button type="button" class="close" data-dismiss="alert">&times;</button>' +
							'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ' + response.messages +
							'</div>');

						// remove the mesages
						$(".alert-success").delay(500).show(10, function () {
							$(this).delay(3000).hide(10, function () {
								$(this).remove();
							});
						}); // /.alert
					} else {

						// remove success messages
						$(".removeProductMessages").html('<div class="alert alert-success">' +
							'<button type="button" class="close" data-dismiss="alert">&times;</button>' +
							'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ' + response.messages +
							'</div>');

						// remove the mesages
						$(".alert-success").delay(500).show(10, function () {
							$(this).delay(3000).hide(10, function () {
								$(this).remove();
							});
						}); // /.alert

					} // /error
				} // /success function
			}); // /ajax fucntion to remove the product
			return false;
		}); // /remove product btn clicked
	} // /if productid
} // /remove product function

function clearForm(oForm) {
	// var frm_elements = oForm.elements;									
	// console.log(frm_elements);
	// 	for(i=0;i<frm_elements.length;i++) {
	// 		field_type = frm_elements[i].type.toLowerCase();									
	// 		switch (field_type) {
	// 	    case "text":
	// 	    case "password":
	// 	    case "textarea":
	// 	    case "hidden":
	// 	    case "select-one":	    
	// 	      frm_elements[i].value = "";
	// 	      break;
	// 	    case "radio":
	// 	    case "checkbox":	    
	// 	      if (frm_elements[i].checked)
	// 	      {
	// 	          frm_elements[i].checked = false;
	// 	      }
	// 	      break;
	// 	    case "file": 
	// 	    	if(frm_elements[i].options) {
	// 	    		frm_elements[i].options= false;
	// 	    	}
	// 	    default:
	// 	        break;
	//     } // /switch
	// 	} // for
}