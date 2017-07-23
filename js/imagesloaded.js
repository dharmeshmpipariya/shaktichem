(function () {
    function a() { } function e(a, b) {
        for (var c = a.length; c--;)if (a[c].listener === b) return c; return -1
    } function f(a) { return function () { return this[a].apply(this, arguments) } } var b = a.prototype, c = this, d = c.EventEmitter;
    b.getListeners = function (b) { var d, e, c = this._getEvents(); if ("object" == typeof b) { d = {}; for (e in c) c.hasOwnProperty(e) && b.test(e) && (d[e] = c[e]) } else d = c[b] || (c[b] = []); return d }, b.flattenListeners = function (b) { var d, c = []; for (d = 0; d < b.length; d += 1)c.push(b[d].listener); return c }, b.getListenersAsObject = function (b) { var d, c = this.getListeners(b); return c instanceof Array && (d = {}, d[b] = c), d || c }, b.addListener = function (b, c) { var g, d = this.getListenersAsObject(b), f = "object" == typeof c; for (g in d) d.hasOwnProperty(g) && e(d[g], c) === -1 && d[g].push(f ? c : { listener: c, once: !1 }); return this }, b.on = f("addListener"), b.addOnceListener = function (b, c) {
        return this.addListener(b, { listener: c, once: !0 })
    }, b.once = f("addOnceListener"), b.defineEvent = function (b) { return this.getListeners(b), this }, b.defineEvents = function (b) { for (var c = 0; c < b.length; c += 1)this.defineEvent(b[c]); return this }, b.removeListener = function (b, c) { var f, g, d = this.getListenersAsObject(b); for (g in d) d.hasOwnProperty(g) && (f = e(d[g], c), f !== -1 && d[g].splice(f, 1)); return this }, b.off = f("removeListener"), b.addListeners = function (b, c) { return this.manipulateListeners(!1, b, c) }, b.removeListeners = function (b, c) { return this.manipulateListeners(!0, b, c) }, b.manipulateListeners = function (b, c, d) { var e, f, g = b ? this.removeListener : this.addListener, h = b ? this.removeListeners : this.addListeners; if ("object" != typeof c || c instanceof RegExp) for (e = d.length; e--;)g.call(this, c, d[e]); else for (e in c) c.hasOwnProperty(e) && (f = c[e]) && ("function" == typeof f ? g.call(this, e, f) : h.call(this, e, f)); return this }, b.removeEvent = function (b) { var e, c = typeof b, d = this._getEvents(); if ("string" === c) delete d[b]; else if ("object" === c) for (e in d) d.hasOwnProperty(e) && b.test(e) && delete d[e]; else delete this._events; return this }, b.removeAllListeners = f("removeEvent"), b.emitEvent = function (b, c) { var e, f, g, h, d = this.getListenersAsObject(b); for (g in d) if (d.hasOwnProperty(g)) for (f = d[g].length; f--;)e = d[g][f], e.once === !0 && this.removeListener(b, e.listener), h = e.listener.apply(this, c || []), h === this._getOnceReturnValue() && this.removeListener(b, e.listener); return this }, b.trigger = f("emitEvent"), b.emit = function (b) { var c = Array.prototype.slice.call(arguments, 1); return this.emitEvent(b, c) }, b.setOnceReturnValue = function (b) { return this._onceReturnValue = b, this }, b._getOnceReturnValue = function () { return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue }, b._getEvents = function () { return this._events || (this._events = {}) }, a.noConflict = function () { return c.EventEmitter = d, a }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () { return a }) : "object" == typeof module && module.exports ? module.exports = a : this.EventEmitter = a
}).call(this), function (a) {
    function d(b) { var c = a.event; return c.target = c.target || c.srcElement || b, c } var b = document.documentElement, c = function () { };
    b.addEventListener ? c = function (a, b, c) { a.addEventListener(b, c, !1) } : b.attachEvent && (c = function (a, b, c) {
        a[b + c] = c.handleEvent ? function () {
            var b = d(a); c.handleEvent.call(c, b)
        } : function () { var b = d(a); c.call(a, b) }, a.attachEvent("on" + b, a[b + c])
    }); var e = function () { }; b.removeEventListener ? e = function (a, b, c) { a.removeEventListener(b, c, !1) } : b.detachEvent && (e = function (a, b, c) { a.detachEvent("on" + b, a[b + c]); try { delete a[b + c] } catch (d) { a[b + c] = void 0 } }); var f = { bind: c, unbind: e }; "function" == typeof define && define.amd ? define("eventie/eventie", f) : a.eventie = f
}(this), function (a, b) {
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (c, d) {
        return b(a, c, d)
    }) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("eventie")) : a.imagesLoaded = b(a, a.EventEmitter, a.eventie)
}(window, function (b, c, d) {
    function h(a, b) { for (var c in b) a[c] = b[c]; return a } function j(a) { return "[object Array]" === i.call(a) } function k(a) {
        var b = []; if (j(a)) b = a; else if ("number" == typeof a.length) for (var c = 0, d = a.length; c < d; c++)b.push(a[c]); else b.push(a); return b
    } function l(a, b, c) { if (!(this instanceof l)) return new l(a, b); "string" == typeof a && (a = document.querySelectorAll(a)), this.elements = k(a), this.options = h({}, this.options), "function" == typeof b ? c = b : h(this.options, b), c && this.on("always", c), this.getImages(), e && (this.jqDeferred = new e.Deferred); var d = this; setTimeout(function () { d.check() }) } function m(a) { this.img = a } function o(a) { this.src = a, n[a] = this } var e = b.jQuery, f = b.console, g = "undefined" != typeof f, i = Object.prototype.toString; l.prototype = new c, l.prototype.options = {}, l.prototype.getImages = function () { this.images = []; for (var a = 0, b = this.elements.length; a < b; a++) { var c = this.elements[a]; "IMG" === c.nodeName && this.addImage(c); var d = c.nodeType; if (d && (1 === d || 9 === d || 11 === d)) for (var e = c.querySelectorAll("img"), f = 0, g = e.length; f < g; f++) { var h = e[f]; this.addImage(h) } } }, l.prototype.addImage = function (a) { var b = new m(a); this.images.push(b) }, l.prototype.check = function () { function d(d, e) { return a.options.debug && g && f.log("confirm", d, e), a.progress(d), b++ , b === c && a.complete(), !0 } var a = this, b = 0, c = this.images.length; if (this.hasAnyBroken = !1, !c) return void this.complete(); for (var e = 0; e < c; e++) { var h = this.images[e]; h.on("confirm", d), h.check() } }, l.prototype.progress = function (a) { this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded; var b = this; setTimeout(function () { b.emit("progress", b, a), b.jqDeferred && b.jqDeferred.notify && b.jqDeferred.notify(b, a) }) }, l.prototype.complete = function () { var a = this.hasAnyBroken ? "fail" : "done"; this.isComplete = !0; var b = this; setTimeout(function () { if (b.emit(a, b), b.emit("always", b), b.jqDeferred) { var c = b.hasAnyBroken ? "reject" : "resolve"; b.jqDeferred[c](b) } }) }, e && (e.fn.imagesLoaded = function (a, b) { var c = new l(this, a, b); return c.jqDeferred.promise(e(this)) }), m.prototype = new c, m.prototype.check = function () { var a = n[this.img.src] || new o(this.img.src); if (a.isConfirmed) return void this.confirm(a.isLoaded, "cached was confirmed"); if (this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth"); var b = this; a.on("confirm", function (a, c) { return b.confirm(a.isLoaded, c), !0 }), a.check() }, m.prototype.confirm = function (a, b) { this.isLoaded = a, this.emit("confirm", this, b) }; var n = {}; return o.prototype = new c, o.prototype.check = function () { if (!this.isChecked) { var a = new Image; d.bind(a, "load", this), d.bind(a, "error", this), a.src = this.src, this.isChecked = !0 } }, o.prototype.handleEvent = function (a) { var b = "on" + a.type; this[b] && this[b](a) }, o.prototype.onload = function (a) { this.confirm(!0, "onload"), this.unbindProxyEvents(a) }, o.prototype.onerror = function (a) { this.confirm(!1, "onerror"), this.unbindProxyEvents(a) }, o.prototype.confirm = function (a, b) { this.isConfirmed = !0, this.isLoaded = a, this.emit("confirm", this, b) }, o.prototype.unbindProxyEvents = function (a) { d.unbind(a.target, "load", this), d.unbind(a.target, "error", this) }, l
});