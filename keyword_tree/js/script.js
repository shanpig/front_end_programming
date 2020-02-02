/**
 * Constants are the modes available.
 * Default is searching mode.
 * 
 * CURRENT AVAILABLE MODES :
 * 1. Searching mode : Links can be clicked, but you can't arrange the nodes.
 * 2. Arranging mode : Links are disabled, and you can arrange/add/delete/update the nodes.
 */

// modes available
const MODES = ["search", "arrange"]
var index = 0 // default mode set to searching mode

/*****************************
 *                           *
 *         FUNCTIONS         *
 *                           *
 *****************************/
function clearForm() {
    $("#template_name").val("")
    $("#template_url").val("")
}

function saveTreeState() {
    localStorage.setItem("tree1", $("#tree1").tree("toJson"))
}

function getCurrentFormValue() {
    return {
        name: $("#template_name").val(),
        url: $("#template_url").val()
    }
}


$(() => {

    /**************************************
     *                                    *
     *             the jqtree             *
     *                                    *
     **************************************/

    /*  Get the list of data from localStorage */
    var data = JSON.parse(localStorage.getItem("tree1"))
    console.log(data)

    /* Initialize the tree. */
    //
    //  autoOpen : Default expand all the nodes.
    //  saveState : Save state for future use.
    //  dragAndDrop : Allow drag and drop, when in arrange mode.
    //  onDragStop : Do something after drop an node.
    //  autoEscape : You can add html format input to names.
    //  opened/closed Icon : set the dropdown icons.
    //  onCanMove : disable moving nodes when in searching mode.
    var $tree = $("#tree1");
    $tree.tree({
        data: data,
        autoOpen: 1,
        saveState: true,
        dragAndDrop: true,
        onDragStop: () => { saveTreeState() },
        autoEscape: false,
        closedIcon: $('<i class="fas fa-arrow-circle-right"></i>'),
        openedIcon: $('<i class="fas fa-arrow-circle-down"></i>'),
        onCanMove: () => {
            if (MODES[index] == "arrange") return true
            else return false
        }
    });

    /**************************************
     *                                    *
     *              BUTTONS               *
     *                                    *
     **************************************/

    /* Nodes */
    // If the node has an url, then open a tab to the according url (in searching mode).
    //
    $("#tree1").on("tree.click", (e) => {

        let node = e.node // get the node
        if (node.url && (MODES[index] == "search")) { // Open url if exists.
            window.open(node.url, "_blank")
        }
    })

    /* New node buttons */
    //
    // Add to parent : add a node to the parent of the chosen node.
    // Add to next : add a same-level node to the chosen node.
    // Add to child : add a child node to the chosen node.
    //
    // 1. Get user input.
    // 2. After user confirmed, set the node.
    //
    // Click add to parent/next/child, and add the node to the according position.
    //
    $(".new_btn").on("click", (e) => {
        if (index != 1) { return } // manipulate the nodes only in arranging mode.

        // Get the node info to be added from the form.
        let item = getCurrentFormValue()

        // Url can be empty, but Name can not be empty.
        if (item.name == "") {
            console.log("error name")
            $("#template_name").attr("placeholder", "Name cannot be empty!")
            return
        }

        // Get selected node.
        let node = $("#tree1").tree("getSelectedNodes")[0]

        // Switch case between add parent/next/child
        switch (e.target.id) {
            case "new_parent_button":
                $("#tree1").tree("addParentNode", item, node);
                node = node.parent; // get parent node for expansion
                break
            case "new_next_button":
                $("#tree1").tree("addNodeAfter", item, node);
                break
            case "new_child_button":
                $("#tree1").tree("appendNode", item, node);
                break
        }

        // Expand the node after addition for clarity
        $("#tree1").tree("openNode", node)

        // Clear input form
        $("#template_name").attr("placeholder", "Name")
        $("#template_url").attr("placeholder", "Url")
        clearForm()

        // Save the changes to localStorage
        saveTreeState()
    })

    /* Update button */
    // 1. Get the selected nodes info to the form at first click.
    // 2. Then update info to the node after clicked second time.
    //
    var update_state = false // Checking if it is the 1st or 2nd click.

    $("#update_button").on("click", () => {
        if (index != 1) { return } else {
            // Get selected node
            let node = $("#tree1").tree("getSelectedNodes")[0]
            if (!update_state) { // First click, get node info to the form.
                $("#template_name").val(node.name)
                $("#template_url").val(node.url)
            } else { // Second click, update node of the info according to the form.
                let item = getCurrentFormValue()
                $("#tree1").tree("updateNode", node, item);
                clearForm()
            }
            // Switch between 1st/2nd click
            update_state = !update_state

            // Save changes
            saveTreeState()
        }

    })

    /* Switch mode */
    // Switch between different modes
    $("#mode_button").on("click", () => {
        // switch mode index
        index = (index + 1) >= MODES.length ? 0 : index + 1

        // Switch functionality according to the mode index.
        switch (index) {
            case 0: // searching mode
                $("#mode_button").removeClass("arrange_mode")
                $("#mode_button").addClass("search_mode")
                $(".btn").addClass("disabled") // disable buttons in searching mode.
                $("#mode_button").removeClass("disabled")
                break

            case 1: // arranging mode
                $("#mode_button").addClass("arrange_mode")
                $("#mode_button").removeClass("search_mode")
                $(".btn").removeClass("disabled") // enable buttons in arranging mode.
                break
        }
        // change text of the button
        $("#mode_button").text("Mode : " + MODES[index])

    })

    // Delete button
    // Delete the node selected.
    $("#delete_button").on("click", () => {
        // Get selected node.
        let node = $("#tree1").tree("getSelectedNodes")[0]
        if (node.children.length != 0) { // alert user when deleting node with children.
            if (confirm("Selected node is node empty, delete the whole node?")) {
                $("#tree1").tree("removeNode", node)
            }
        } else {
            $("#tree1").tree("removeNode", node)
        }

        // Save the changes to localStorage
        saveTreeState()
    })


})