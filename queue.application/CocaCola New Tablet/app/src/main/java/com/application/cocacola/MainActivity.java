package com.application.cocacola;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telephony.TelephonyManager;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

public class MainActivity extends AppCompatActivity {

    public Button nextButton;
    public ValueContainer app;
    public Typeface yourfont;
    public TextView textViewTeam;

    public boolean quanUpdated;

    public ArrayList<Integer> inStockEmoji;
    public ArrayList<Integer> inStockEmojiId;

    public boolean deviceIsAllowed = false;
    public String deviceID;

    public int[] mResources = {
            R.drawable.emoji1,
            R.drawable.emoji2,
            R.drawable.emoji3,
            R.drawable.emoji4,
            R.drawable.emoji5,
            R.drawable.emoji6
    };

    public String[] allowedDevices = {
            "359355051034911",
            "359093051767582"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        deviceID = getDeviceID();

        for(int i = 0; i < allowedDevices.length; i++)
        {
            if(allowedDevices[i].equals(deviceID))
            {
                deviceIsAllowed = true;
            }
        }

        yourfont = Typeface.createFromAsset(getAssets(), "fonts/coke.otf");

        app = (ValueContainer) getApplicationContext();

        nextButton = (Button) findViewById(R.id.submitButton);
        nextButton.setOnClickListener(nextButtonListener);
        nextButton.setTypeface(yourfont);

        textViewTeam = (TextView)findViewById(R.id.teamName);
        textViewTeam.setTypeface(yourfont);

        quanUpdated = false;

        if(!deviceIsAllowed)
        {
            message("Device Not Authorized");
            nextButton.setEnabled(false);
            textViewTeam.setFocusable(false);
        }
        else
        {

            if (app.getcheckedQty() == false) {

                if (app.checkServerAvailability()) {
                    checkQuantities();
                    app.setcheckedQty(true);
                    quanUpdated = true;
                } else {
                    message("Server Not Available. Please Try Again");
                }
            }
        }
    }

    @Override
    protected void onRestart() {
        super.onRestart();

        quanUpdated = false;
        if(app.checkServerAvailability())
        {
            checkQuantities();
            quanUpdated = true;
        }
        else
        {
            message("Server Not Available. Please Try Again");
        }
    }

    private final OnClickListener nextButtonListener = new OnClickListener() {
        @Override
        public void onClick(View arg0) {

            String textBoxValue = textViewTeam.getText().toString();

            if(quanUpdated)
            {
                if(!textBoxValue.equals(""))
                {
                    app.setTeamName(textBoxValue);
                    textViewTeam.setText("");

                    Intent intent = new Intent(MainActivity.this, TeamMemberOneViewEmoji.class);
                    startActivity(intent);
                }
                else {
                    message("Please Enter A Team Name");
                }
            }
            else
            {
                if(app.checkServerAvailability())
                {
                    quanUpdated = true;
                    checkQuantities();

                    if(!textBoxValue.equals(""))
                    {
                        app.setTeamName(textBoxValue);
                        textViewTeam.setText("");

                        Intent intent = new Intent(MainActivity.this, TeamMemberOneViewEmoji.class);
                        startActivity(intent);
                    }
                    else
                    {
                        message("Please Enter A Team Name");
                    }
                }
                else
                {
                    message("Server Not Available. Please Try Again");
                }
            }
        }
    };

    public void setHeadingText(TextView t, String val) {
        t.setText(val);
    }

    public void message(String message)
    {
        Toast toast = Toast.makeText(this, message, Toast.LENGTH_LONG);

        ViewGroup group = (ViewGroup) toast.getView();
        TextView messageTextView = (TextView) group.getChildAt(0);
        messageTextView.setTextSize(25);
        messageTextView.setTypeface(yourfont);

        toast.setGravity(Gravity.TOP|Gravity.CENTER, 0,0);
        toast.show();
    }

    public void checkQuantities()
    {
        inStockEmoji = new ArrayList<Integer>();
        inStockEmojiId = new ArrayList<Integer>();

        app.getQuantities();
        message("Quantities Updated");

        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            //Handle exception
        }

        if(app.smileyOneQty > 1)
        {
            inStockEmoji.add(R.drawable.emoji1);
            inStockEmojiId.add(7);
        }
        if(app.smileyTwoQty > 1)
        {
            inStockEmoji.add(R.drawable.emoji2);
            inStockEmojiId.add(8);
        }
        if(app.smileyThreeQty > 1)
        {
            inStockEmoji.add(R.drawable.emoji3);
            inStockEmojiId.add(9);
        }
        if(app.smileyFourQty > 1)
        {
            inStockEmoji.add(R.drawable.emoji4);
            inStockEmojiId.add(10);
        }
        if(app.smileyFiveQty > 1)
        {
            inStockEmoji.add(R.drawable.emoji5);
            inStockEmojiId.add(11);
        }
        if(app.smileySixQty > 1)
        {
            inStockEmoji.add(R.drawable.emoji6);
            inStockEmojiId.add(12);
        }

        app.setInStockEmoji(inStockEmoji);
        app.setInStockEmojiId(inStockEmojiId);
    }

    public String getDeviceID()
    {
        TelephonyManager telephonyManager = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
        return telephonyManager.getDeviceId();
    }
}
