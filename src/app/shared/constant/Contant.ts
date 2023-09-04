export class Constant{

    public static phpServiceURL = "/DemoOneNetwork/";
    // public static phpServiceURL = "http://trinityapplab.in/DemoOneNetwork/";

    // public static phpServiceURL = "/in3.co.in/DemoOneNetwork/";
    // public static phpServiceURL = "http://www.in3.co.in/in3.co.in/DemoOneNetwork/";

    public static serverURL = "/2020_WS/tom/";
    
    // public static APP_NAME = "OneNetwork";
    public static SUCCESSFUL_STATUS_CODE = "100000";
    public static GENERIC_DATABASE_ERROR = "-102003";
    public static NO_RECORDS_FOUND_CODE = "102001";
    public static NO_RECORD_FOUND = "No Record Found";
    public static TRINITY_PRIVATE_KEY = "TRINITYPRIVATEKEY";
    public static GOOGLE_MAP_API_KEY = "AIzaSyDkv0_3UwK1Y_EpQ1LHQr5KA5oVBMc1160";
    public static SERVER_ERROR = "Server Error";
    public static TOSTER_FADEOUT_TIME = 1000;
    public static ALERT_FADEOUT_TIME = 2000;
    public static ADDRESS_URL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDXvfMPhjz1LnaKVKoIuyfHjoMIhysfxjo"
    
    public static returnServerErrorMessage(serviceName:string):string{
        return "Server error while invoking "+serviceName+ " service";
    }
    
}