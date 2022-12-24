/* Sticky */
function Sticky(sticky, options) {
    if (!sticky.nodeName) sticky = document.querySelector(sticky)
    if (!sticky) return false

    let defaultOptions = {
        offsetTop: 0,
        wrapperClass: "",
    }
    options = { ...defaultOptions, ...options }

    let footer = document.querySelector(".page-footer"),
        boundaryTop,
        boundaryBottom,
        placeholder,
        wrapper

    this.init = function () {
        this.wrap()
        this.setBoundaries()
        this.rePositionSticky()
        window.addEventListener("scroll", this.rePositionSticky)
        window.addEventListener("resize", this.reset.bind(this))
    }

    this.reset = function () {
        this.setBoundaries()
        this.rePositionSticky()
    }

    this.wrap = function () {
        wrapper = document.createElement("div")
        sticky.parentNode.insertBefore(wrapper, sticky)
        wrapper.appendChild(sticky)
        wrapper.classList.add("sticky-wrapper")
        if (options.wrapperClass) wrapper.classList.add(options.wrapperClass)

        placeholder = document.createElement("div")
        wrapper.parentNode.insertBefore(placeholder, wrapper)
        placeholder.appendChild(wrapper)
        placeholder.classList.add("sticky-placeholder")
        placeholder.style.position = "relative"
        this.setplaceholderHeight()
    }

    this.setplaceholderHeight = function () {
        placeholder.style.height = sticky.offsetHeight + "px"
    }

    this.setBoundaries = function () {
        this.boundaryTop = this.offset(placeholder).top
        this.boundaryBottom = this.offset(footer).top - placeholder.offsetHeight
    }

    this.offset = function (el) {
        let rect = el.getBoundingClientRect()
        return {
            top: rect.top + document.scrollingElement.scrollTop,
            left: rect.left + document.scrollingElement.scrollLeft,
        }
    }

    this.rePositionSticky = function () {
        if (
            document.scrollingElement.scrollTop >
            this.boundaryTop - options.offsetTop
        ) {
            sticky.classList.add("sticky")
            let top =
                document.scrollingElement.scrollTop + options.offsetTop <
                this.boundaryBottom
                    ? options.offsetTop
                    : this.boundaryBottom - document.scrollingElement.scrollTop
            wrapper.style = "position: fixed; top: " + top + "px"
        } else {
            sticky.classList.remove("sticky")
            wrapper.removeAttribute("style")
        }
    }.bind(this)

    this.init()
}

window.addEventListener("load", function () {
    var sticky_menucontent = new Sticky(
        document.querySelector(".menucontent").closest(".container"),
        // ".menucontent",
        {
            // offsetTop: 20,
            wrapperClass: "bg-white",
        }
    )
})
/* Sticky END */
