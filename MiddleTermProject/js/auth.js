class Auth {
    constructor() {
        this.storage = window.localStorage;

        $("#logout").on("click", this.logout);
        
        if (this.isLogged) {
            $("#login").hide();
            
            $("#username").text(this.name);
            $("#logged").show();
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

    reloadInDom() {
        $("#loginName").value = this.name;
    }
}

const auth = new Auth();