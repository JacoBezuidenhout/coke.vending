package com.application.cocacola;


import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class TeamMemberOneViewEmoji extends MainActivity  {

    private Button nextButton;
    private CustomPagerAdapter mCustomPagerAdapter;
    private ViewPager mViewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.team_member_one_view);

        nextButton = (Button) findViewById (R.id.submitButton);
        nextButton.setOnClickListener(nextButtonListener);
        nextButton.setTypeface(yourfont);

        mCustomPagerAdapter = new CustomPagerAdapter(this, mResources);
        mViewPager = (ViewPager) findViewById(R.id.pager);
        mViewPager.setClipToPadding(false);
        // setPadding (int left, int top, int right, int bottom)
        mViewPager.setPadding(120, 0, 120, 0);
        mViewPager.setPageMargin(0);
        mViewPager.setAdapter(mCustomPagerAdapter);
        mViewPager.setCurrentItem(3);

    }

    private final View.OnClickListener nextButtonListener = new View.OnClickListener() {
        @Override
        public void onClick(View arg0) {

            if(mViewPager.getCurrentItem() == 0 && app.smileyOneQty < 1)
            {
                message("Current Item Out Of Stock");
            }
            else if(mViewPager.getCurrentItem() == 1 && app.smileyTwoQty < 1)
            {
                message("Current Item Out Of Stock");
            }
            else if(mViewPager.getCurrentItem() == 2 && app.smileyThreeQty < 1)
            {
                message("Current Item Out Of Stock");
            }
            else if(mViewPager.getCurrentItem() == 3 && app.smileyFourQty < 1)
            {
                message("Current Item Out Of Stock");
            }
            else if(mViewPager.getCurrentItem() == 4 && app.smileyFiveQty < 1)
            {
                message("Current Item Out Of Stock");
            }
            else if(mViewPager.getCurrentItem() == 5 && app.smileySixQty < 1)
            {
                message("Current Item Out Of Stock");
            }
            else
            {
                app.setSmileyOne(mViewPager.getCurrentItem());

                Intent intent = new Intent(TeamMemberOneViewEmoji.this, TeamMemberOnePhrase.class);
                startActivity(intent);
                finish();
            }
        }
    };


}
