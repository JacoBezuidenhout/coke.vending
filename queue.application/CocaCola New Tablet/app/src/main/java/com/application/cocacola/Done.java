package com.application.cocacola;


import android.os.Bundle;
import android.os.Handler;

public class Done extends MainActivity{

    // Splash screen timer
    private static int SPLASH_TIME_OUT = 1000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.done);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                // close this activity
                finish();
            }
        }, SPLASH_TIME_OUT);
    }
}
