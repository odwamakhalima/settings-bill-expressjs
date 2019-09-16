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
        if (action === 'call') {
            cost += callCost
        }
        else if (action === 'sms') {
            cost += smsCost
        }
        list.push({
            type: action,
            cost,
            timestamp:new Date()
           
        })

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
        var reachedWarning = total >= warningLevel && total < criticalLevel;
        return reachedWarning
    }

    function hasReachedCric() {
        const total = finalTotal;
        return total > criticalLevel
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
        hasReachedCric,
    }
}