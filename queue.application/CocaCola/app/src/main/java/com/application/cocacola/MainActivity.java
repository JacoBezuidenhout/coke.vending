package com.application.cocacola;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

public class MainActivity extends AppCompatActivity {

    private Button nextButton;
    ValueContainer app;
    Typeface yourfont;
    TextView textViewTeam;

    public ArrayList<Integer> inStockEmoji;
    public ArrayList<Integer> inStockEmojiId;

    public int[] mResources = {
            R.drawable.first_emoji,
            R.drawable.second_emoji,
            R.drawable.third_emoji,
            R.drawable.fourth_emoji,
            R.drawable.fifth_emoji,
            R.drawable.sixth_emoji
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        yourfont = Typeface.createFromAsset(getAssets(), "fonts/coke.otf");

        app = (ValueContainer) getApplicationContext();

        nextButton = (Button) findViewById(R.id.submitButton);
        nextButton.setOnClickListener(nextButtonListener);
        nextButton.setTypeface(yourfont);

        textViewTeam = (TextView)findViewById(R.id.teamName);
        textViewTeam.setTypeface(yourfont);


        if(app.getcheckedQty() == false) {
            checkQuantities();
            message("Quantities Updated");
            app.setcheckedQty(true);
        }
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        checkQuantities();
        message("Quantities Updated");
    }

    private final OnClickListener nextButtonListener = new OnClickListener() {
        @Override
        public void onClick(View arg0) {

            String textBoxValue = textViewTeam.getText().toString();
            app.setTeamName(textBoxValue);
            textViewTeam.setText("");

            Intent intent = new Intent(MainActivity.this, TeamMemberOneViewEmoji.class);
            startActivity(intent);
        }
    };

    public void setHeadingText(TextView t, String val)
    {
        t.setText(val);
    }

    public void message(String message)
    {
        Toast toast = Toast.makeText(this, message, Toast.LENGTH_LONG);
        toast.setGravity(Gravity.TOP|Gravity.CENTER,0,0);
        toast.show();
    }

    public void checkQuantities()
    {
        inStockEmoji = new ArrayList<Integer>();
        inStockEmojiId = new ArrayList<Integer>();

        app.getQuantities();

        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            //Handle exception
        }

        if(app.smileyOneQty > 1)
        {
            inStockEmoji.add(R.drawable.first_emoji);
            inStockEmojiId.add(7);
        }
        if(app.smileyTwoQty > 1)
        {
            inStockEmoji.add(R.drawable.second_emoji);
            inStockEmojiId.add(8);
        }
        if(app.smileyThreeQty > 1)
        {
            inStockEmoji.add(R.drawable.third_emoji);
            inStockEmojiId.add(9);
        }
        if(app.smileyFourQty > 1)
        {
            inStockEmoji.add(R.drawable.fourth_emoji);
            inStockEmojiId.add(10);
        }
        if(app.smileyFiveQty > 1)
        {
            inStockEmoji.add(R.drawable.fifth_emoji);
            inStockEmojiId.add(11);
        }
        if(app.smileySixQty > 1)
        {
            inStockEmoji.add(R.drawable.sixth_emoji);
            inStockEmojiId.add(12);
        }

        app.setInStockEmoji(inStockEmoji);
        app.setInStockEmojiId(inStockEmojiId);
    }
}
