package id.agusibrahim.httpdsimple;
import org.apache.cordova.CordovaActivity;
import android.os.Bundle;

public class cordovaActivity extends CordovaActivity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
