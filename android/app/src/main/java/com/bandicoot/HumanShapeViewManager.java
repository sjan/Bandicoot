package com.bandicoot;

import android.util.Log;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by Stephen on 11/5/2017.
 */

public class  HumanShapeViewManager extends SimpleViewManager<HumanView> {
    public static final String REACT_CLASS = "HumanShapeImageView";
    private static final String TAG = HumanShapeViewManager.class.getSimpleName();

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected HumanView createViewInstance(ThemedReactContext reactContext) {
        Log.d(TAG, "createViewInstance");
        return new HumanView(reactContext.getBaseContext());
    }

    public void setChestWidth(HumanView humanView, int width) {
        humanView.chestWidthCM(width);
    }

    public void setWaistWidth(HumanView humanView, int width) {
        humanView.waistWidthCM(width);
    }

    public void setHipWidth(HumanView humanView, int width) {
        humanView.hipWidthCM(width);
    }

    @ReactProp(name = "chestSize")
    public void setChestSize(HumanView humanView, int width) {
        humanView.chestCM(width);
    }

    @ReactProp(name = "waistSize")
    public void setWaistSize(HumanView humanView, int width) {
        humanView.waistCM(width);
    }

    @ReactProp(name = "hipSize")
    public void setHipSize(HumanView humanView, int width) {
        humanView.hipCM(width);
    }

    @ReactProp(name = "fullHeight")
    public void setFullHeight(HumanView humanView, int height) {
        humanView.heightCM(height);
    }
}
