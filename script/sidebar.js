// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open()
{
    if (mySidebar.style.display === 'block')
    {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    }
    else
    {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

// Close the sidebar with the close button
function w3_close()
{
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}

//Animated Collapsibles
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

let collapsed = false;
let expandAllButton = document.querySelector("#expand-all");
if (expandAllButton) {
	expandAllButton.addEventListener("click", function() {
		document.querySelectorAll(".collapsible").forEach(function(e) { 
			if (e.classList.contains("active") === collapsed ) {
				e.click();
			} 
		}); 
		collapsed = !collapsed;
		if (collapsed) {
			expandAllButton.textContent = "Collapse all";
		} else {
			expandAllButton.textContent = "Expand all";
		}
		
	});
}



//sortTables
function sortTable(columnNumber, tableName)
{
    var table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
    table = document.getElementById(tableName);
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
      no switching has been done:*/
    while (switching)
    {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
          first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++)
        {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
              one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[columnNumber];
            y = rows[i + 1].getElementsByTagName("TD")[columnNumber];
            /*check if the two rows should switch place,
              based on the direction, asc or desc:*/
            if (dir == "asc")
            {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())
                {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            else if (dir == "desc")
            {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
                {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch)
        {
            /*If a switch has been marked, make the switch
              and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        }
        else
        {
            /*If no switching has been done AND the direction is "asc",
              set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc")
            {
                dir = "desc";
                switching = true;
            }
        }
    }
}

