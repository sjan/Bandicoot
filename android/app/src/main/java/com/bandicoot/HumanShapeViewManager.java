package com.bandicoot;

import android.util.Log;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

/**
 * Created by Stephen on 11/5/2017.
 */

public class HumanShapeViewManager extends SimpleViewManager<HumanView> {
    public static final String REACT_CLASS = "HumanShapeImageView";
    private static final String TAG = HumanShapeViewManager.class.getSimpleName();

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected HumanView createViewInstance(ThemedReactContext reactContext) {
        return new HumanView(reactContext.getBaseContext());
    }

    @ReactMethod
    public void chestSize(int chestSize) {
        Log.d(TAG, String.valueOf(chestSize));
    }
}
