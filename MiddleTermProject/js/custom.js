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

    get redirect() {
        var actualPath = window.location.href;
        var parts = actualPath.split("/");
        parts.pop();
        return parts.join("/") + "/index.html";
    }

    get isLogged() {
        return this.storage.getItem("name") !== null;
    }

    login() {
        this.storage.setItem("name", btoa($("#loginName").val()));
        window.location.href = this.redirect;
    }

    logout() {
        this.storage.removeItem("name");
        window.location.href = this.redirect;
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
        return this.storage.getItem("cart") || [];
    }

    showCart() {
        if (this.hasItemsInCart) {
            $(".shoppingCart").show();
        } else {
            $(".shoppingCart").hide();
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
        
        cart.push({name, artist})
        
        this.storage.setItem("cart", cart);
        
        this.showCart();
    }

    removeFromCart(item) {
        var cart = this.cart;
        
        // TODO: Logic behind this

        this.storage.setItem("cart", cart);

        if (cart.length < 0) this.emptyCart();
    }
}

const auth = new Auth();
const store = new Store();