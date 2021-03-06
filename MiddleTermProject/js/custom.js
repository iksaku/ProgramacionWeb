function getBasePath() {
    var actualPath = window.location.href;
    var parts = actualPath.split("/");
    parts.pop();
    return parts.join("/")
}

class Auth {
    constructor() {
        this.storage = window.localStorage;

        $("#logout").on("click", this.logout);
        
        if (this.isLogged) {
            $("#login").hide();
            
            $("#username").text(this.name);
            $("#logged").show();
        } else {
            $("#login").show();
            $("#logged").hide();
        }
    }

    get name() {
        if (!this.isLogged) return null;
        return atob(this.storage.getItem("name"));
    }

    get isLogged() {
        return this.storage.getItem("name") !== null;
    }

    redirect() {
        window.location.href =  getBasePath() + "/index.html";
    }

    login() {
        this.storage.setItem("name", btoa($("#loginName").val()));
        this.redirect();
    }

    logout() {
        this.storage.removeItem("name");
        this.redirect()
    }
}

class Store {
    constructor() {
        this.storage = window.localStorage;

        $(".buy-tickets").each(function(index) {
            $(this).find(".musica-btn").on("click", function() {
                store.addToCart($(this));
            });
        });

        this.showCart();
    }

    get hasItemsInCart() {
        return this.cart.length > 0;
    }

    get cart() {
        var cart = this.storage.getItem("cart");
        return cart == null ? [] : JSON.parse(this.storage.getItem("cart"));
    }

    redirect() {
        window.location.href =  getBasePath() + "/buy.html";
    }

    showCart() {
        let shoppingCart = $(".shoppingCart");
        if (this.hasItemsInCart) {
            let menu = $("#cart-menu");
            menu.empty();

            for (var item of this.cart.values()) {
                menu.append(
                    $("<button>").addClass("dropdown-item").text(item.name)
                )
            }

            menu.append(
                $("<div>").addClass("dropdown-divider"),
                $("<button>").addClass("dropdown-item").text("Comprar").on('click', function() {
                    store.buy();
                })
            )

            shoppingCart.show();
        } else {
            shoppingCart.hide();
        }
    }

    emptyCart() {
        this.storage.removeItem("cart");
        this.showCart();
    }

    addToCart(item) {
        var cart = this.cart;
        var data = item.parent().parent().find(".shows-name");
        var name = data.find("h6").text();
        var artist = data.find("p").text();

        var isPresent = false;
        for (var item of cart) {
            if (item.name == name && item.artist == artist) {
                isPresent = true;
                break;
            }
        }
        
        if (!isPresent) {
            cart.push({name, artist});
            this.storage.setItem("cart", JSON.stringify(cart));
        }
        
        this.showCart();
    }

    /** TODO... Altough, I think this will not be implemented anyways   
    removeFromCart(item) {
        var cart = this.cart;
        
        // TODO: Logic behind this

        this.storage.setItem("cart", cart);

        if (cart.length < 0) this.emptyCart();
    }
    */

    buy() {
        if (auth.isLogged) {
            this.emptyCart();
        }
        this.redirect();
    }
}

const auth = new Auth();
const store = new Store();