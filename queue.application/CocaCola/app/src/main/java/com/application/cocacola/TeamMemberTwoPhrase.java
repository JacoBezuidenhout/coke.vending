package com.application.cocacola;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.TextView;

public class TeamMemberTwoPhrase extends MainActivity {

    private Button submitButton;
    private RadioButton radioFun;
    private RadioButton radioTogether;
    private RadioButton radioHoliday;
    private RadioButton radioSummer;
    private RadioButton radioForever;
    private RadioButton radioLove;
    private ValueContainer app;
    private TextView textViewRadio;

    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.team_member_two_phrase);

        app = (ValueContainer) getApplicationContext();

        submitButton = (Button) findViewById(R.id.submitButton);
        submitButton.setOnClickListener(submitButtonListener);
        submitButton.setTypeface(yourfont);

        radioFun = (RadioButton) findViewById(R.id.radioFun);
        radioFun.setOnClickListener(radioFunListener);
        radioFun.setTypeface(yourfont);

        if(app.stickerFunQty < 1)
        {
            radioFun.setEnabled(false);
            radioFun.setVisibility(View.INVISIBLE);
        }

        radioTogether = (RadioButton) findViewById(R.id.radioTogether);
        radioTogether.setOnClickListener(radioTogetherListener);
        radioTogether.setTypeface(yourfont);

        if(app.stickerTogetherQty < 1)
        {
            radioTogether.setEnabled(false);
            radioTogether.setVisibility(View.INVISIBLE);
        }


        radioHoliday = (RadioButton) findViewById(R.id.radioHoliday);
        radioHoliday.setOnClickListener(radioHolidayListener);
        radioHoliday.setTypeface(yourfont);

        if(app.stickerHolidayQty < 1)
        {
            radioHoliday.setEnabled(false);
            radioHoliday.setVisibility(View.INVISIBLE);
        }

        radioSummer = (RadioButton) findViewById(R.id.radioSummer);
        radioSummer.setOnClickListener(radioSummerListener);
        radioSummer.setTypeface(yourfont);

        if(app.stickerSummerQty < 1)
        {
            radioSummer.setEnabled(false);
            radioSummer.setVisibility(View.INVISIBLE);
        }

        radioForever = (RadioButton) findViewById(R.id.radioForever);
        radioForever.setOnClickListener(radioForeverListener);
        radioForever.setTypeface(yourfont);

        if(app.stickerForeverQty < 1)
        {
            radioForever.setEnabled(false);
            radioForever.setVisibility(View.INVISIBLE);
        }

        radioLove = (RadioButton) findViewById(R.id.radioLove);
        radioLove.setOnClickListener(radioLoveListener);
        radioLove.setTypeface(yourfont);

        if(app.stickerLoveQty < 1)
        {
            radioLove.setEnabled(false);
            radioLove.setVisibility(View.INVISIBLE);
        }

        ImageView imageView = (ImageView) findViewById(R.id.imageViewTwo);

        for(int i=0 ; i< app.inStockEmojiId.size(); i++)
        {
            if(app.inStockEmojiId.get(i) == app.getSmileyTwoArrVal())
            {
                imageView.setImageResource(app.inStockEmoji.get(i));
            }
        }

        textViewRadio = (TextView)findViewById(R.id.textViewRadio);
        textViewRadio.setTypeface(yourfont);

        removeUsedPhrase();
    }


    public void removeUsedPhrase()
    {
        app.getStickerOne();

        if(app.getStickerOne() == 1)
        {
            radioFun.setEnabled(false);
            radioFun.setVisibility(View.INVISIBLE);
        }
        else if(app.getStickerOne() == 2)
        {
            radioTogether.setEnabled(false);
            radioTogether.setVisibility(View.INVISIBLE);
        }
        else if(app.getStickerOne() == 3)
        {
            radioHoliday.setEnabled(false);
            radioHoliday.setVisibility(View.INVISIBLE);
        }
        else if(app.getStickerOne() == 4)
        {
            radioSummer.setEnabled(false);
            radioSummer.setVisibility(View.INVISIBLE);
        }
        else if(app.getStickerOne() == 5)
        {
            radioForever.setEnabled(false);
            radioForever.setVisibility(View.INVISIBLE);
        }
        else if(app.getStickerOne() == 6)
        {
            radioLove.setEnabled(false);
            radioLove.setVisibility(View.INVISIBLE);
        }

    }

    private final View.OnClickListener submitButtonListener = new View.OnClickListener() {
        @Override
        public void onClick(View arg0) {

            if (app.getStickerTwo() != -1)
            {
                if(app.checkServerAvailability())
                {
                    System.out.println("*********************************");
                    System.out.println(app.getSmileyOne());
                    System.out.println(app.getSmileyTwo());
                    System.out.println(app.getStickerOne());
                    System.out.println(app.getStickerTwo());
                    System.out.println("*********************************");

                    System.out.println(app.createOrder());
                    message("Order Submitted");

                    Intent intent = new Intent(TeamMemberTwoPhrase.this, Done.class);
                    startActivity(intent);
                    finish();
                }
                else
                {
                    message("Server Not Available. Please Try Again");
                }
            }
            else
            {
                message("Please Select A Phrase");
            }
        }
    };

    private final View.OnClickListener radioFunListener = new View.OnClickListener(){
        public void onClick(View v) {
            if(radioFun.isChecked()){
                radioFun.setTextColor(Color.parseColor("#FFFFFF"));
                setHeadingText(textViewRadio, "Fun");
                app.setStickerTwo(1);

                radioTogether.setTextColor(Color.parseColor("#FF0000"));
                radioTogether.setChecked(false);

                radioHoliday.setTextColor(Color.parseColor("#FF0000"));
                radioHoliday.setChecked(false);

                radioSummer.setTextColor(Color.parseColor("#FF0000"));
                radioSummer.setChecked(false);

                radioForever.setTextColor(Color.parseColor("#FF0000"));
                radioForever.setChecked(false);

                radioLove.setTextColor(Color.parseColor("#FF0000"));
                radioLove.setChecked(false);
            }
        }
    };

    private final View.OnClickListener radioTogetherListener = new View.OnClickListener(){
        public void onClick(View v) {
            if(radioTogether.isChecked()){
                radioTogether.setTextColor(Color.parseColor("#FFFFFF"));
                setHeadingText(textViewRadio, "Together");
                app.setStickerTwo(2);

                radioFun.setTextColor(Color.parseColor("#FF0000"));
                radioFun.setChecked(false);

                radioHoliday.setTextColor(Color.parseColor("#FF0000"));
                radioHoliday.setChecked(false);

                radioSummer.setTextColor(Color.parseColor("#FF0000"));
                radioSummer.setChecked(false);

                radioForever.setTextColor(Color.parseColor("#FF0000"));
                radioForever.setChecked(false);

                radioLove.setTextColor(Color.parseColor("#FF0000"));
                radioLove.setChecked(false);
            }
        }
    };

    private final View.OnClickListener radioHolidayListener = new View.OnClickListener(){
        public void onClick(View v) {
            if(radioHoliday.isChecked()){
                radioHoliday.setTextColor(Color.parseColor("#FFFFFF"));
                setHeadingText(textViewRadio, "Holiday");
                app.setStickerTwo(3);

                radioFun.setTextColor(Color.parseColor("#FF0000"));
                radioFun.setChecked(false);

                radioTogether.setTextColor(Color.parseColor("#FF0000"));
                radioTogether.setChecked(false);

                radioSummer.setTextColor(Color.parseColor("#FF0000"));
                radioSummer.setChecked(false);

                radioForever.setTextColor(Color.parseColor("#FF0000"));
                radioForever.setChecked(false);

                radioLove.setTextColor(Color.parseColor("#FF0000"));
                radioLove.setChecked(false);
            }
        }
    };

    private final View.OnClickListener radioSummerListener = new View.OnClickListener(){
        public void onClick(View v) {
            if(radioSummer.isChecked()){
                radioSummer.setTextColor(Color.parseColor("#FFFFFF"));
                setHeadingText(textViewRadio, "Summer");
                app.setStickerTwo(4);

                radioFun.setTextColor(Color.parseColor("#FF0000"));
                radioFun.setChecked(false);

                radioTogether.setTextColor(Color.parseColor("#FF0000"));
                radioTogether.setChecked(false);

                radioHoliday.setTextColor(Color.parseColor("#FF0000"));
                radioHoliday.setChecked(false);

                radioForever.setTextColor(Color.parseColor("#FF0000"));
                radioForever.setChecked(false);

                radioLove.setTextColor(Color.parseColor("#FF0000"));
                radioLove.setChecked(false);
            }
        }
    };

    private final View.OnClickListener radioForeverListener = new View.OnClickListener(){
        public void onClick(View v) {
            if(radioForever.isChecked()){
                radioForever.setTextColor(Color.parseColor("#FFFFFF"));
                setHeadingText(textViewRadio, "Forever");
                app.setStickerTwo(5);

                radioFun.setTextColor(Color.parseColor("#FF0000"));
                radioFun.setChecked(false);

                radioTogether.setTextColor(Color.parseColor("#FF0000"));
                radioTogether.setChecked(false);

                radioHoliday.setTextColor(Color.parseColor("#FF0000"));
                radioHoliday.setChecked(false);

                radioSummer.setTextColor(Color.parseColor("#FF0000"));
                radioSummer.setChecked(false);

                radioLove.setTextColor(Color.parseColor("#FF0000"));
                radioLove.setChecked(false);
            }
        }
    };

    private final View.OnClickListener radioLoveListener = new View.OnClickListener(){
        public void onClick(View v) {
            if(radioLove.isChecked()){
                radioLove.setTextColor(Color.parseColor("#FFFFFF"));
                setHeadingText(textViewRadio, "Love");
                app.setStickerTwo(6);

                radioFun.setTextColor(Color.parseColor("#FF0000"));
                radioFun.setChecked(false);

                radioTogether.setTextColor(Color.parseColor("#FF0000"));
                radioTogether.setChecked(false);

                radioHoliday.setTextColor(Color.parseColor("#FF0000"));
                radioHoliday.setChecked(false);

                radioSummer.setTextColor(Color.parseColor("#FF0000"));
                radioSummer.setChecked(false);

                radioForever.setTextColor(Color.parseColor("#FF0000"));
                radioForever.setChecked(false);
            }
        }
    };
}
