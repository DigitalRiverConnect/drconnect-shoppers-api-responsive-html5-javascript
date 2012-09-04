(function(window, $) {
	var client;
	var popovers = {};
	var enableFeaturedProducts = true;
	
	function connect() {
		var cid = $("#txtClientId").val();
		if(!cid) {
			$("#clientIdGroup").addClass("error");
			showErrors([{field: "#txtClientId", message:"Enter a Client ID"}]);
			return;
		}
		$("#clientIdGroup").removeClass("error");
					
		$("#form").hide();
		setConnectingState(true);
		
		client = new dr.api.Client(cid, {});
		client.connect().then(function() {
			var p = Q.all([loadOffers(), loadCategories()]).then(function(results) {
				$("#spanClientId").html(cid);
				goToStep2();
			}).fail(function(error) {
				showErrors([{field: "#txtClientId", message:"Error connecting to the server, please try again later"}]);
			});
			return p;
		}).fail(function(error) {
			showErrors([{field: "#txtClientId", message:"Error connecting to the server, please verify the Client ID"}]);
		}).fin(function() {
			setConnectingState(false);
		});
	}
	
	function setConnectingState(connecting) {
		if(connecting) {
			$("#loadingText").html("Connecting...");
			$("#loadingIcon").css("display", "inline-block");
			$("#btnConnect").attr("disabled", "disabled").addClass("disabled");
		} else {
			$("#loadingText").html("Connect");
			$("#loadingIcon").css("display", "none");
			$("#btnConnect").removeAttr("disabled").removeClass("disabled");
		}
	}

	function getSubcategory(node, handler) {
		client.categories.get(node.id)
			.then(function(data) {
				handler(convertCategoriesToTree(data.categories));
			});
	}

	function convertCategoriesToTree(data) {
		var result = [];
		if(!data)
			return result;
		for(var i = 0; i < data.category.length; i++) {
			var cat = data.category[i];
			var id = cat.id;
			if(!id) {
				id = parseInt(cat.uri.substring(cat.uri.lastIndexOf("/") + 1));
			}
			result.push({
				label : cat.displayName,
				id : id,
				load_on_demand : true
			});
		}
		return result;
	}

	function nodeSelected(node, li, checked) {
		var nodes = $("#treeCategories").tree('getCheckedNodes');
		
		var $list = $("#selectedCategories");
		
		$list.html((nodes.length == 0)?"<li>None</li>":"");
		
		for(var i = 0; i < nodes.length; i++) {
			$("#selectedCategories").append("<li>" + nodes[i].name + "</li>")
		}
	}

	function loadCategories() {
		return client.categories.list({'expand' : 'category'})
			.then(function(data) {
				$("#treeCategories").tree({
					selectable : false,
					onNodeRequired : getSubcategory,
					onNodeCheck : nodeSelected,
					data : convertCategoriesToTree(data)
				})
			});
	}

	function loadOffers() {
		return client.offers.list('Banner_ShoppingCartLocal', {'expand' : 'offer'})
			.then(function(data) {
				var combo = $("#selectOffers");
				combo.html("");
				if(!data.offer) {
					enableFeaturedProducts = false;
					return;
				}
				enableFeaturedProducts = true;
				for(var i = 0; i < data.offer.length; i++) {
					var offer = data.offer[i];
					combo.append("<option value='" + offer.id + "'>" + offer.name + "</option>");
				}
			});
	}

	function resetForm() {
		setCheckboxState("#btnFeaturedProductsVisible", true);
		if(!enableFeaturedProducts) {
			$("#btnFeaturedProductsVisible").click();
			$("#btnFeaturedProductsVisible").attr("disabled", "disabled");
		}
		setCheckboxState("#btnCandyRackVisible", false);
		$("#selectOffers").val("");
		$("#numProducts").val("3");
		$("#inputCandyRackPopName").val("");
		$("#pageSize").val("5");
		hideErrors();
		$("#selectedCategories").html("<li>None</li>");
	}
	
	function hideErrors() {
		$(".control-group").removeClass("error");
		$.each(popovers, function(i, item) {
			$(i).popover('destroy');
		});
	}
	
	function showErrors(errors) {
		var $list = $("#errorPanel ul");

		for(var i = 0; i < errors.length; i++) {
			$(errors[i].field).popover({html: true, content: '<span class="error-message">'+ errors[i].message +'</span>'}).popover('show');
			popovers[errors[i].field] = true;
			$(errors[i].field).closest(".control-group").addClass("error");
		}
	}

	function enableSection($checkbox, sectionSelector, inputSelector) {
		$checkbox.attr("disabled", "disabled");
		if(isChecked($checkbox)) {
			$(sectionSelector).collapse('show');
		} else {
			$(inputSelector).val("");
			$(sectionSelector).collapse("hide");
		}
		$checkbox.removeAttr("disabled");
	}

	function getFields() {
		var nodes = $("#treeCategories").tree('getCheckedNodes');
		var catIds = [];
		for(var i = 0; i < nodes.length; i++) {
			catIds.push(nodes[i].id);
		}

		return {
			clientId : $("#txtClientId").val(),
			fpVisible : isChecked("#btnFeaturedProductsVisible"),
			fpOfferId : ($("#selectOffers").val())?$("#selectOffers").val():"",
			fcIds : catIds,
			fcNumProducts : $("#numProducts").val(),
			crVisible : isChecked("#btnCandyRackVisible"),
			crPopName : $("#inputCandyRackPopName").val(),
			pageSize : $("#pageSize").val()
		};
	}
	
	function addError(field, message) {
		return {field: field, message: message};
	}
	
	function validateFields(fields) {
		var errors = [];

		if(!fields.clientId || fields.clientId == "") {
			errors.push(addError("#txtClientId","Client ID is required"));
		}
		if(fields.fpVisible && !fields.fpOfferId) {
			errors.push(addError("#selectOffers","Select an Offer ID for the Featured Products"));;
		}
		if(!$.isNumeric(fields.fcNumProducts) || fields.fcNumProducts.indexOf(".") > 0) {
			errors.push(addError("#numProducts","The number of products must be an integer"));
		}
		if(fields.crVisible && !fields.crPopName) {
			errors.push(addError("#inputCandyRackPopName","Enter a POP name for the Candy Rack"));
		}
		if(!$.isNumeric(fields.pageSize) || fields.pageSize.indexOf(".") > 0) {
			errors.push(addError("#pageSize","The page size must be an integer"));
		}
		return errors;
	}

	function createJSON(fields) {
		return {
			key : fields.clientId,
			pageSize : parseInt(fields.pageSize),
			featuredCategories : {
				ids : fields.fcIds,
				numberOfProducts : parseInt(fields.fcNumProducts)
			},
			featuredProducts : {
				visible : fields.fpVisible,
				pop : "Banner_ShoppingCartLocal",
				offer : fields.fpOfferId
			},
			candyRack : {
				visible : fields.crVisible,
				pop : fields.crPopName
			}
		};
	}

	function onFormSubmit(e) {
		e.preventDefault();
		hideErrors();
		var json = getConfigJSON();
		if(json != "") {
			$.storage.setItem('sampleAppConfig', json, 'localStorage');
			window.location = "../index.htm";
		}
		return false;
	}
	
	function onGenerateJSON(e) {
		e.preventDefault();
		hideErrors();
		var json = getConfigJSON();
		if(json) {
			$("#jsonContent").html(json);
			prettyPrint();
			$('#jsonModal').modal({show: true});
		}
		return false;
	}
	
	function getConfigJSON() {
		var $list = $("#errorPanel ul");
		$list.html("");

		var fields = getFields();
		var errors = validateFields(fields);
		if(errors.length > 0) {
			showErrors(errors);
			return "";
		} else {
			return JSON.stringify(createJSON(fields), null, '\t');
		}
	}

	function isChecked(selector) {
		return ($(selector).find("i").css("visibility") != "hidden");
	}
	function setCheckboxState(selector, checked) {
		var visibility = (checked)?"visible":"hidden";
		$(selector).find("i").css("visibility", visibility);
	}
	function toggleCheckbox(selector) {
		setCheckboxState(selector, !isChecked(selector));
	}
	
	function goToStep1() {
		$(".step1").show();
		$(".step2").hide();
		resetForm();
		$("#treeCategories").tree('destroy');
	}
	function goToStep2() {
		resetForm();
		$(".step2").show();
		$(".step1").hide();
	}
	
	$(document).ready(function() {
		$("#btnConnect").click(function(e) {
			e.preventDefault();
			connect();
		});
		
		$("#btnChange").click(function(e) {
			goToStep1();
		});

		$("#btnCandyRackVisible").click(function(e) {
			toggleCheckbox($(this));
			enableSection($(this), "#sectionCandyRack", "#inputCandyRackPopName")
		});
		$("#btnFeaturedProductsVisible").click(function(e) {
			toggleCheckbox($(this));
			enableSection($(this), "#sectionFeaturedProducts", "#selectOffers")
		});

		$("#btnLaunch").click(onFormSubmit);
		$("#btnGenerateJSON").click(onGenerateJSON);
	});
})(window, jQuery);