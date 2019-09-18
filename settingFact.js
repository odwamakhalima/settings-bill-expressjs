module.exports = function setBill() {
    var callCost;
    var smsCost;
    var warningLevel;
    var criticalLevel;

    var list = []

    function data(input) {
        callCost = Number(input.callCost)
        smsCost = Number(input.smsCost)
        warningLevel = Number(input.warningLevel)
        criticalLevel = Number(input.criticalLevel)

    }

    function getData() {
        return {
            callCost,
            smsCost,
            warningLevel,
            criticalLevel
        }
    }

    function add(action) {
        var cost = 0
        if(reachcri()){
            return "danger"
        }
        else if(!reachcri()){
        if (action === 'call') {
            cost += callCost
        }
        else if (action === 'sms') {
            cost += smsCost
        }
    
    var moment = require('moment');
        list.push({
            type: action,
            cost,
            time:moment(new Date()).fromNow()
           
        })
    }
    }

    function outPut() {
        return list
    }

    function filter(type) {
        return list.filter((action) => action.type === type)
    }

    function getTotal(type) {
        return list.reduce((total, action) => {
            let val = action.type === type ? action.cost : 0
            return total + val
        }, 0)
    }

    function finalTotal() {
        return getTotal('call') + getTotal('sms')
    }



    function totals() {
        var callTotal = getTotal('call')
        var smsTotal = getTotal('sms')
        return {
            callTotal,
            smsTotal,
            finalTotal: finalTotal()
        }
    }

    function reachWarn() {
        var total = finalTotal()
        if(total >= warningLevel && total < criticalLevel){
            return 'warning'
        }
        else if(total >= criticalLevel){
            return 'danger'
        }
        
    }

    function reachcri() {
        return finalTotal() >= criticalLevel
    }

    return {
        getData,
        data,
        add,
        outPut,
        filter,
        getTotal,
        finalTotal,
        totals,
        reachWarn,
        reachcri
      
    }
}