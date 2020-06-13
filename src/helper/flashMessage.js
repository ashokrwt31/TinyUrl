
const getFlashMessage = (msgType) => {
    let msg = ""; 
    switch (msgType) {
        case "alias": 
                msg = "This custom alias already exists. Please enter different alias." 
                break;
        case "deleteSuccess": 
                msg = "Record successfully deleted !" 
                break;
        case "expire": 
                msg = "Link has been expried." 
                break;
    }
    return msg;
}


const checkFlashMessage = (req) => {
    let flashMsg = null;
    if (req.flash("flashMsg") === getFlashMessage("deleteSuccess")) {
        flashMsg = getFlashMessage("deleteSuccess");
      }
    else if (req.flash("flashMsg") === getFlashMessage("alias")) {
        flashMsg = getFlashMessage("alias");
      }
    else if (req.flash("flashMsg") === getFlashMessage("expire")) {
        flashMsg = getFlashMessage("expire");
    }  
    return flashMsg;
}
module.exports = { getFlashMessage, checkFlashMessage};