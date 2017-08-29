/***********************************************
* Contractible Headers script- © Dynamic Drive (www.dynamicdrive.com)
* This notice must stay intact for legal use. Last updated Oct 21st, 2003.
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/

/*

 * USAGE NOTES:

	This script works with virtually any content on your page to make them contractible. 
	We deliberately made the HTML code in Step 2 very simple to illustrate the basic syntax 
	required. The two steps required are:
	
	1) Create the header that will expand a content when clicked on. Here's an example:
	
	<h3 onClick="expandcontent('sc1')" style="cursor:hand; cursor:pointer">
	What is JavaScript?</h3>
	The part in red is the ONLY required portion- everything else you can customize, from the 
	header's style to even the tag used (ie: <img> instead of <h3>).
	
	2) Specify the content that will be associated with the above and become expandable:
	
	<div id="sc1" class="switchcontent">
	JavaScript is a scripting language originally developed by Netscape.....
	</div> 
	Once again, the portion in red are required within the content. The ID attribute used above 
	(ie: sc1) can be arbitrary, but MUST match the "sc1" specified within the header of step 1). 
	This is so the header knows which content it should expand- it's not physic you know! Now, 
	feel free to swap the <DIV> tag used to surround your content with a different tag, such as 
	<span>, <p> etc.
	
	One final thought. When the page first loads, by default all of the participating content 
	are contracted until the user starts clicking on the headers. If you wish to make a 
	particular content be visible from the start, you can use the CSS "display" property to 
	accomplish this:
	
	<div id="sc1" class="switchcontent" style="display:block">
	{stuff}
	</div>
	And that's it. As you can see, the script is extremely adaptable, and you shouldn't' have a 
	problem integrating it with all sorts of different content on your page.
	
	Do enjoy!

 */

var enablepersist="on" //Enable saving state of content structure using session cookies? (on/off)
var collapseprevious="no" //Collapse previously open content when opening present? (yes/no)

if (document.getElementById){
	document.write('<style type="text/css">\n')
	document.write('.switchcontent {\n\tdisplay:\tnone;\n}')
	document.write('</style>\n')
}

function getElementbyClass(classname){
	ccollect=new Array()
	var inc=0
	var alltags=document.all? document.all : document.getElementsByTagName("*")
	for (i=0; i<alltags.length; i++){
		if (alltags[i].className==classname)
		ccollect[inc++]=alltags[i]
	}
}

function contractcontent(omit){
	var inc=0
	while (ccollect[inc]){
		if (ccollect[inc].id!=omit) {
			ccollect[inc].style.display="none"
		}
		inc++
	}
}

function expandcontent(cid){
	if (typeof ccollect!="undefined"){
		if (collapseprevious=="yes") {
			contractcontent(cid)
		}
		document.getElementById(cid).style.display=(document.getElementById(cid).style.display!="block")? "block" : "none"
	}
}

function revivecontent(){
	contractcontent("omitnothing")
	selectedItem=getselectedItem()
	selectedComponents=selectedItem.split("|")
	for (i=0; i<selectedComponents.length-1; i++) {
		document.getElementById(selectedComponents[i]).style.display="block"
	}
}

function get_cookie(Name) { 
	var search = Name + "="
	var returnvalue = "";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search)
		if (offset != -1) { 
			offset += search.length
			end = document.cookie.indexOf(";", offset);
			if (end == -1) end = document.cookie.length; {
				returnvalue=unescape(document.cookie.substring(offset, end))
			}
		}
	}
	return returnvalue;
}

function getselectedItem(){
	if (get_cookie(window.location.pathname) != ""){
		selectedItem=get_cookie(window.location.pathname)
		return selectedItem
	} 
	else {
		return ""
	}
}

function saveswitchstate(){
	var inc=0, selectedItem=""
	while (ccollect[inc]){
		if (ccollect[inc].style.display=="block") {
			selectedItem+=ccollect[inc].id+"|"
		}
		inc++
	}
	document.cookie=window.location.pathname+"="+selectedItem
}

function do_onload(){
	getElementbyClass("switchcontent")
	if (enablepersist=="on" && typeof ccollect!="undefined") {
		revivecontent()
	}
}


if (window.addEventListener) {
	window.addEventListener("load", do_onload, false)
}
else if (window.attachEvent) {
	window.attachEvent("onload", do_onload)
}
else if (document.getElementById) {
	window.onload=do_onload
}

if (enablepersist=="on" && document.getElementById) {
	window.onunload=saveswitchstate
}