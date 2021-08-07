var manageBrandTable;

$(document).ready(function() {
	// top bar active
	$('#navBrand').addClass('active');
	
	// manage brand table
	manageBrandTable = $("#manageBrandTable").DataTable({
		'ajax': 'php_action/fetchSupplier.php',
		'order': []		
	});

	// submit brand form function
	$("#submitBrandForm").unbind('submit').bind('submit', function() {
		// remove the error text
		$(".text-danger").remove();
		// remove the form error
		$('.form-group').removeClass('has-error').removeClass('has-success');			

		var suppName = $("#suppName").val();
		var suppStatus = $("#suppStatus").val();

		if(suppName == "") {
			$("#suppName").after('<p class="text-danger">Supplier Name field is required</p>');
			$('#suppName').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#suppName").find('.text-danger').remove();
			// success out for form 
			$("#suppName").closest('.form-group').addClass('has-success');	  	
		}

		if(suppStatus == "") {
			$("#suppStatus").after('<p class="text-danger">Supplier Name field is required</p>');
			$('#suppStatus').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#suppStatus").find('.text-danger').remove();
			// success out for form 
			$("#suppStatus").closest('.form-group').addClass('has-success');	  	
		}

		if(suppName && suppStatus) {
			var form = $(this);
			// button loading
			$("#createBrandBtn").button('loading');

			$.ajax({
				url : form.attr('action'),
				type: form.attr('method'),
				data: form.serialize(),
				dataType: 'json',
				success:function(response) {
					// button loading
					$("#createBrandBtn").button('reset');

					if(response.success == true) {
						// reload the manage member table 
						manageBrandTable.ajax.reload(null, false);						

  	  			// reset the form text
						$("#submitBrandForm")[0].reset();
						// remove the error text
						$(".text-danger").remove();
						// remove the form error
						$('.form-group').removeClass('has-error').removeClass('has-success');
  	  			
  	  			$('#add-brand-messages').html('<div class="alert alert-success">'+
            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
          '</div>');

  	  			$(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert
					}  // if

				} // /success
			}); // /ajax	
		} // if

		return false;
	}); // /submit brand form function

});

function editBrands(suppId = null) {
	if(suppId) {
		// remove hidden brand id text
		$('#suppId').remove();

		// remove the error 
		$('.text-danger').remove();
		// remove the form-error
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// modal loading
		$('.modal-loading').removeClass('div-hide');
		// modal result
		$('.edit-brand-result').addClass('div-hide');
		// modal footer
		$('.editBrandFooter').addClass('div-hide');

		$.ajax({
			url: 'php_action/fetchSelectedSupp.php',
			type: 'post',
			data: {suppId : suppId},
			dataType: 'json',
			success:function(response) {
				// modal loading
				$('.modal-loading').addClass('div-hide');
				// modal result
				$('.edit-brand-result').removeClass('div-hide');
				// modal footer
				$('.editBrandFooter').removeClass('div-hide');

				// setting the brand name value 
				$('#editSuppName').val(response.supp_name);
				// setting the brand status value
				$('#editSuppStatus').val(response.supp_active);
				// brand id 
				$(".editBrandFooter").after('<input type="hidden" name="suppId" id="suppId" value="'+response.supp_id+'" />');

				// update brand form 
				$('#editBrandForm').unbind('submit').bind('submit', function() {

					// remove the error text
					$(".text-danger").remove();
					// remove the form error
					$('.form-group').removeClass('has-error').removeClass('has-success');			

					var suppName = $('#editSuppName').val();
					var suppStatus = $('#editSuppStatus').val();

					if(suppName == "") {
						$("#editSuppName").after('<p class="text-danger">Supplier Name field is required</p>');
						$('#editSuppName').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editSuppName").find('.text-danger').remove();
						// success out for form 
						$("#editSuppName").closest('.form-group').addClass('has-success');	  	
					}
                    
					if(suppStatus == "") {
						$("#editSuppStatus").after('<p class="text-danger">Supplier Status field is required</p>');

						$('#editSuppStatus').closest('.form-group').addClass('has-error');
					} else {
						// remove error text field
						$("#editSuppStatus").find('.text-danger').remove();
						// success out for form 
						$("#editSuppStatus").closest('.form-group').addClass('has-success');	  	
					}

					if(suppName && suppStatus) {
						var form = $(this);

						// submit btn
						$('#editBrandBtn').button('loading');

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {

								if(response.success == true) {
									console.log(response);
									// submit btn
									$('#editBrandBtn').button('reset');

									// reload the manage member table 
									manageBrandTable.ajax.reload(null, false);								  	  										
									// remove the error text
									$(".text-danger").remove();
									// remove the form error
									$('.form-group').removeClass('has-error').removeClass('has-success');
			  	  			
			  	  			$('#edit-brand-messages').html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

			  	  			$(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert
								} // /if
									
							}// /success
						});	 // /ajax												
					} // /if

					return false;
				}); // /update brand form

			} // /success
		}); // ajax function

	} else {
		alert('error!! Refresh the page again');
	}
} // /edit brands function

function removeBrands(suppId = null) {
	if(suppId) {
		$('#removeSuppId').remove();
		$.ajax({
			url: 'php_action/fetchSelectedSupp.php',
			type: 'post',
			data: {suppId : suppId},
			dataType: 'json',
			success:function(response) {
				$('.removeBrandFooter').after('<input type="hidden" name="removeSuppId" id="removeSuppId" value="'+response.supp_id+'" /> ');

				// click on remove button to remove the brand
				$("#removeBrandBtn").unbind('click').bind('click', function() {
					// button loading
					$("#removeBrandBtn").button('loading');

					$.ajax({
						url: 'php_action/removeSupp.php',
						type: 'post',
						data: {suppId : suppId},
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// button loading
							$("#removeBrandBtn").button('reset');
							if(response.success == true) {

								// hide the remove modal 
								$('#removeMemberModal').modal('hide');

								// reload the brand table 
								manageBrandTable.ajax.reload(null, false);
								
								$('.remove-messages').html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

			  	  			$(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert
							} else {

							} // /else
						} // /response messages
					}); // /ajax function to remove the brand

				}); // /click on remove button to remove the brand

			} // /success
		}); // /ajax

		$('.removeBrandFooter').after();
	} else {
		alert('error!! Refresh the page again');
	}
} // /remove brands function