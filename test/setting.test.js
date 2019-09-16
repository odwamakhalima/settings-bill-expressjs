let assert = require("assert");
const setBill = require("../settingFact");

describe('Setting-Bill function', function () {

    

    it('should return callcost,smscost,warning level and critical level correctly', function () {

        var setFact = setBill()

        setFact.data({
            callCost: 7,
            smsCost: 5,
            warningLevel: 20,
            criticalLevel: 30,

        })

        assert.deepEqual({
            callCost: 7,
            smsCost: 5,
            warningLevel: 20,
            criticalLevel: 30,

        }, setFact.getData());
    });

    it('should return only the call and sms cost', function () {

        var setFact = setBill()

        setFact.data({
            callCost: 7,
            smsCost: 5,
            warningLevel: 20,
            criticalLevel: 30,
        })

        setFact.add('call')
        setFact.add('sms')

        assert.deepEqual([{
            type: 'call',
            cost:7
        },{
            type: 'sms',
            cost:5
        }], setFact.outPut());
    });

    var setFact = setBill()

    it('should add all calls and return the total', function () {

        setFact.data({
            callCost: 7,
            smsCost: 5,
            warningLevel: 20,
            criticalLevel: 30,
        })

        setFact.add('call')
        setFact.add('call')
       

        assert.deepEqual(14, setFact.getTotal('call'));
    });

    var setFact = setBill()

    it('should add all sms and return the total', function () {

        setFact.data({
            callCost: 7,
            smsCost: 5,
            warningLevel: 20,
            criticalLevel: 30,
        })

        setFact.add('sms')
        setFact.add('sms')
       

        assert.deepEqual(10, setFact.getTotal('sms'));
    });

    it('should add all sms and calls and return the total', function () {

        var setFact = setBill()

        setFact.data({
            callCost: 7,
            smsCost: 5,
            warningLevel: 20,
            criticalLevel: 30,
        })

        setFact.add('sms')
        setFact.add('call')
        setFact.add('sms')
        setFact.add('call')
        setFact.add('sms')
        setFact.add('call')
        setFact.add('sms')
        setFact.add('call')
     

        assert.deepEqual(48, setFact.finalTotal());
    });

    it('should return total for calls,sms and final total when calls and sms are added', function () {

        var setFact = setBill()

        setFact.data({
            callCost: 7,
            smsCost: 5,
            warningLevel: 20,
            criticalLevel: 30,
        })

        setFact.add('sms')
        setFact.add('call')
        setFact.add('sms')
        setFact.add('call')
        setFact.add('sms')
        setFact.add('call')
        setFact.add('sms')
        setFact.add('call')
     

        assert.deepEqual({
            callTotal:28,
            smsTotal:20,
            finalTotal:48
        }, setFact.totals());
    });
});