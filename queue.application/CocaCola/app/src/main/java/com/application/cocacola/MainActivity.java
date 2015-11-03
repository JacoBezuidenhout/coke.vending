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

public class MainActivity extends AppCompatActivity {

    private Button nextButton;
    ValueContainer app;
    Typeface yourfont;
    TextView textViewTeam;

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
            app.getQuantities();
            message("Quantities Updated");
            app.setcheckedQty(true);
        }
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        app.getQuantities();
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
}
