declare var math;

math.import({
    avg:function(...items){
        return items.reduce((v,it)=>(+it + +v),0)/items.filter(i=>i).length;
    },
    colSum:function(colName){
        return colName.reduce((v,it)=>(+it + +v),0)
    },
    generateRandomNumber:function(){
        return Date.now();
    }
})

//let formula = {"$factorial":{ "$multiply": [ { "$sqrt": "marks" },"const"] }}


export let calculateFormula = (formula, dataPoint = {}) => {

    let out;

    if (typeof formula === "string") {
        try{
        out = math.eval(formula, dataPoint);
        }
        catch(err){
            console.log(err);
            out=0;
        }
    }
    else if (Array.isArray(formula) && Array.isArray(dataPoint)) {
       // out = evalPipeline(formula, dataPoint)
    }
    return out;
}
/*
function evalPipeline(formula, dataPoint) {
    let out;
    for (let part of formula) {
        if (typeof (part) == "object") {
            let keys= Object.keys(part);
            if( keys.length == 1){
                let key = keys[0];
                let value = part[key];
                if(typeof value == "string"){
                    let matrix =  math.matrix(dataPoint.map(obj => obj[value]));
                    if (out!==undefined) {
                        out = math[key](out,matrix);
                    }
                    else {
                        out = math[key](matrix);
                    }
                }
                else if(Array.isArray(value) && value.length==2){
                    let matrix1 =  math.matrix(dataPoint.map(obj => obj[value]));
                    if (out!==undefined) {
                        out = math[key](out,matrix);
                    }
                    else {
                        out = math[key](matrix);
                    }
                }
            }
            else{
                break;
            }
        }
        else if (typeof part == "string") {
            if (out!==undefined) {
                out = math[part](out) || math.eval(part);
            }
            else {
                out = math.eval(part);
            }
        }
        else{
            break;
        }
    }
}
*/


//console.log(calculate('(avg(b1)+avg(b2)+avg(b3))/2',{b1:5}));