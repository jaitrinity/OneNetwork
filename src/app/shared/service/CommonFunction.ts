export class CommonFunction{
    public static createCommaSeprate(listData : any):string{
        let commSeprateValue = "";
        for(let i=0;i<listData.length;i++){
            commSeprateValue += listData[i].paramCode;
            if(i != listData.length-1){
            commSeprateValue += ",";
            }
        }
        return commSeprateValue;
    }

    public static createCommaSeprateByParamDesc(listData : any):string{
        let commSeprateValue = "";
        for(let i=0;i<listData.length;i++){
            commSeprateValue += listData[i].paramDesc;
            if(i != listData.length-1){
            commSeprateValue += ",";
            }
        }
        return commSeprateValue;
    }

    public static getBooleanValue(bolValue : boolean) : number{
        let v = 0;
        if(bolValue){
          v = 1;
        }
        return v;
    }

    public static prepareCommaSeprateValue(listData : any):string{
        let commSeprateValue = "";
        for(let i=0;i<listData.length;i++){
            commSeprateValue += listData[i];
            if(i != listData.length-1){
                commSeprateValue += ",";
            }
        }
        return commSeprateValue;
    }
}