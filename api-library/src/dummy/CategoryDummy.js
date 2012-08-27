var ns = namespace('dr.api.dummy');
/**
 * Category resource dummy
 */

/*
 * Getting all the Categories
 * ie: GET http://mockapi.com:80/v1/shoppers/me/categories
 */
ns.categories = {
	"categories" : {
		"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
		"uri" : "http://mockapi.com/v1/shoppers/me/categories",
		"category" : [{
			"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/57618400"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58783700"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812500"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812600"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812700"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812800"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948700"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58949800"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58949900"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/CategoryAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950000"
		}]
	}
};

/*
 * Getting all the Categories
 * ie: GET http://mockapi.com:80/v1/shoppers/me/categories?expand=category
 */
ns.categoriesExpandCategory = {
	"categories" : {
		"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
		"uri" : "http://mockapi.com/v1/shoppers/me/categories",
		"category" : [{
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/57618400",
			"id" : 57618400,
			"locale" : "en_US",
			"name" : "Audio",
			"displayName" : "Audio",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/57618400/products"
			}
		}, {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58783700",
			"id" : 58783700,
			"locale" : "en_US",
			"name" : "Business & Finance",
			"displayName" : "Business & Finance",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58783700/products"
			}
		}, {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812500",
			"id" : 58812500,
			"locale" : "en_US",
			"name" : "Desktop Enhancements",
			"displayName" : "Desktop Enhancements",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812500/products"
			}
		}, {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812600",
			"id" : 58812600,
			"locale" : "en_US",
			"name" : "Home & Education",
			"displayName" : "Home & Education",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812600/products"
			}
		}, {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812700",
			"id" : 58812700,
			"locale" : "en_US",
			"name" : "Internet",
			"displayName" : "Internet",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812700/products"
			}
		}, {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812800",
			"id" : 58812800,
			"locale" : "en_US",
			"name" : "Multimedia & Design",
			"displayName" : "Multimedia & Design",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812800/products"
			}
		}, {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948700",
			"id" : 58948700,
			"locale" : "en_US",
			"name" : "Software Development",
			"displayName" : "Software Development",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948700/products"
			}
		}, {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58949800",
			"id" : 58949800,
			"locale" : "en_US",
			"name" : "Utilities",
			"displayName" : "Utilities",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58949800/products"
			}
		}, {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58949900",
			"id" : 58949900,
			"locale" : "en_US",
			"name" : "Web Authoring",
			"displayName" : "Web Authoring",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58949900/products"
			}
		}, {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950000",
			"id" : 58950000,
			"locale" : "en_US",
			"name" : "Games",
			"displayName" : "Games",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950000/products"
			}
		}]
	}
};

/*
 * Getting an specific Category
 * ie: GET http://mockapi.com:80/v1/shoppers/me/categories/56194500
 */
ns.category = {
	"57618400" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/57618400",
			"id" : 57618400,
			"locale" : "en_US",
			"name" : "Audio",
			"displayName" : "Audio",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/57618400/products"
			},
			"categories" : {
				"category" : [{
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950100",
					"displayName" : "Players",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950100/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950200",
					"displayName" : "Utilities & Plug-Ins",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950200/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950300",
					"displayName" : "Music Creation",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950300/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950400",
					"displayName" : "Rippers & Encoders ",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950400/products"
					}
				}]
			}
		}
	},
	"58783700" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58783700",
			"id" : 58783700,
			"locale" : "en_US",
			"name" : "Business & Finance",
			"displayName" : "Business & Finance",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58783700/products"
			},
			"categories" : {
				"category" : [{
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58783800",
					"displayName" : "Inventory Systems",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58783800/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948800",
					"displayName" : "Legal",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948800/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948900",
					"displayName" : "Project Management",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948900/products"
					}
				}]
			}
		}
	},
	"58812500" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812500",
			"id" : 58812500,
			"locale" : "en_US",
			"name" : "Desktop Enhancements",
			"displayName" : "Desktop Enhancements",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812500/products"
			},
			"categories" : {
				"category" : [{
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950500",
					"displayName" : "Icons",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950500/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950600",
					"displayName" : "Skins",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950600/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950700",
					"displayName" : "Screensavers",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950700/products"
					}
				}]
			}
		}
	},
	"58812600" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812600",
			"id" : 58812600,
			"locale" : "en_US",
			"name" : "Home & Education",
			"displayName" : "Home & Education",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812600/products"
			},
			"categories" : {
				"category" : [{
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950800",
					"displayName" : "Calendars & Planners",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950800/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950900",
					"displayName" : "E-books & Literature ",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950900/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951000",
					"displayName" : "Food & Beverage ",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951000/products"
					}
				}]
			}
		}
	},
	"58812700" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812700",
			"id" : 58812700,
			"locale" : "en_US",
			"name" : "Internet",
			"displayName" : "Internet",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812700/products"
			},
			"categories" : {
				"category" : [{
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951100",
					"displayName" : "Browsers",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951100/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951200",
					"displayName" : "Communications",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951200/products"
					}
				}]
			}
		}
	},
	"58812800" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812800",
			"id" : 58812800,
			"locale" : "en_US",
			"name" : "Multimedia & Design",
			"displayName" : "Multimedia & Design",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58812800/products"
			},
			"categories" : {
				"category" : [{
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951300",
					"displayName" : "video",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951300/products"
					}
				}, {
					"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
					"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951400",
					"displayName" : "Image Editing ",
					"products" : {
						"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
						"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951400/products"
					}
				}]
			}
		}
	},

	"58948700" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948700",
			"id" : 58948700,
			"locale" : "en_US",
			"name" : "Software Development",
			"displayName" : "Software Development",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948700/products"
			},
			"categories" : null
		}
	},

	"58949800" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58949800",
			"id" : 58949800,
			"locale" : "en_US",
			"name" : "Utilities",
			"displayName" : "Utilities",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58949800/products"
			},
			"categories" : null
		}
	},

	"58949900" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58949900",
			"id" : 58949900,
			"locale" : "en_US",
			"name" : "Web Authoring",
			"displayName" : "Web Authoring",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58949900/products"
			},
			"categories" : null
		}
	},

	"58950000" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950000",
			"id" : 58950000,
			"locale" : "en_US",
			"name" : "Games",
			"displayName" : "Games",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950000/products"
			},
			"categories" : null
		}
	},
	"58950100" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950100",
			"id" : 58950100,
			"locale" : "en_US",
			"name" : "Players",
			"displayName" : "Players",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950100/products"
			},
			"categories" : null
		}
	},

	"58950200" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950200",
			"id" : 58950200,
			"locale" : "en_US",
			"name" : "Utilities & Plug-Ins",
			"displayName" : "Utilities & Plug-Ins",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950200/products"
			},
			"categories" : null
		}
	},

	"58950300" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950300",
			"id" : 58950300,
			"locale" : "en_US",
			"name" : "Music Creation",
			"displayName" : "Music Creation",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950300/products"
			},
			"categories" : null
		}
	},
	"58950400" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950400",
			"id" : 58950400,
			"locale" : "en_US",
			"name" : "Rippers & Encoders ",
			"displayName" : "Rippers & Encoders ",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950400/products"
			},
			"categories" : null
		}
	},
	"58783800" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58783800",
			"id" : 58783800,
			"locale" : "en_US",
			"name" : "Inventory Systems",
			"displayName" : "Inventory Systems",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58783800/products"
			},
			"categories" : null
		}
	},
	"58948800" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948800",
			"id" : 58948800,
			"locale" : "en_US",
			"name" : "Legal",
			"displayName" : "Legal",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948800/products"
			},
			"categories" : null
		}
	},
	"58948900" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948900",
			"id" : 58948900,
			"locale" : "en_US",
			"name" : "Project Management",
			"displayName" : "Project Management",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58948900/products"
			},
			"categories" : null
		}
	},
	"58950500" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950500",
			"id" : 58950500,
			"locale" : "en_US",
			"name" : "Icons",
			"displayName" : "Icons",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950500/products"
			},
			"categories" : null
		}
	},
	"58950600" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950600",
			"id" : 58950600,
			"locale" : "en_US",
			"name" : "Skins",
			"displayName" : "Skins",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950600/products"
			},
			"categories" : null
		}
	},
	"58950700" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950700",
			"id" : 58950700,
			"locale" : "en_US",
			"name" : "Screensavers",
			"displayName" : "Screensavers",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950700/products"
			},
			"categories" : null
		}
	},
	"58950800" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950800",
			"id" : 58950800,
			"locale" : "en_US",
			"name" : "Calendars & Planners",
			"displayName" : "Calendars & Planners",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950800/products"
			},
			"categories" : null
		}
	},
	"58950900" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950900",
			"id" : 58950900,
			"locale" : "en_US",
			"name" : "E-books & Literature ",
			"displayName" : "E-books & Literature ",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58950900/products"
			},
			"categories" : null
		}
	},
	"58951000" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951000",
			"id" : 58951000,
			"locale" : "en_US",
			"name" : "Food & Beverage ",
			"displayName" : "Food & Beverage ",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951000/products"
			},
			"categories" : null
		}
	},
	"58951100" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951100",
			"id" : 58951100,
			"locale" : "en_US",
			"name" : "Browsers",
			"displayName" : "Browsers",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951100/products"
			},
			"categories" : null
		}
	},
	"58951200" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951200",
			"id" : 58951200,
			"locale" : "en_US",
			"name" : "Communications",
			"displayName" : "Communications",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951200/products"
			},
			"categories" : null
		}
	},
	"58951300" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951300",
			"id" : 58951300,
			"locale" : "en_US",
			"name" : "video",
			"displayName" : "video",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951300/products"
			},
			"categories" : null
		}
	},
	"58951400" : {
		"category" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/CategoriesResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951400",
			"id" : 58951400,
			"locale" : "en_US",
			"name" : "Image Editing ",
			"displayName" : "Image Editing ",
			"products" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/categories/58951400/products"
			},
			"categories" : null
		}
	}
};

/*
 * Error while getting specific Category
 * ie: GET http://mockapi.com:80/v1/shoppers/me/categories/56194500
 */
ns.categoryNotFound = {
	"GetCategoryResponse" : {
		"ns2" : "http://integration.digitalriver.com/CatalogService",
		"ns3" : "http://integration.digitalriver.com/CommonAttributes/1.0",
		"catalogKey" : {
			"catalogID" : 14429300,
			"catalogName" : "Microsoft Store Demo",
			"companyID" : "msdemo"
		},
		"responseCode" : {
			"value" : "CATEGORY_NOT_FOUND",
			"message" : "Could not find category for requested category ID products"
		}
	}
};

/*
 * Getting Products by an specific Category
 * ie: GET http://mockapi.com:80/v1/shoppers/me/categories/56194500/products
 */
ns.productsForCategory = {
	"Products" : {
		"relation" : "http://dev.digitalriver.com/api-overview/ProductsAPI",
		"uri" : "http://mockapi.com/v1/shoppers/me/products",
		"Product" : [{
			"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/products/241930600",
			"displayName" : "Test Product"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/products/248217200",
			"displayName" : "Sing Network Admin Professional"
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/products/248217400",
			"displayName" : "PhotoshopView"
		}],
		"totalResults" : 3,
		"totalResultPages" : 1
	}
};
