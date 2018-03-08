package com.tripgroup;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.react.arron.speech.speechModulePackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;

public class MainApplication extends Application implements ReactApplication
{
    // 设置为 true 将不弹出 toast
    private boolean SHUTDOWN_TOAST = false;
    // 设置为 true 将不打印 log
    private boolean SHUTDOWN_LOG = false;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this)
    {
        @Override
        public boolean getUseDeveloperSupport()
        {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages()
        {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNSpinkitPackage(),
                    new ReactMaterialKitPackage(),
                    new speechModulePackage(),
                    new RCTSwipeRefreshLayoutPackage(),
                    new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost()
    {
        return mReactNativeHost;
    }

    @Override
    public void onCreate()
    {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
