package com.application.cocacola;



import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.view.SoundEffectConstants;
import android.view.View;
import android.widget.Button;


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

        mCustomPagerAdapter = new CustomPagerAdapter(this, app.inStockEmoji);
        mViewPager = (ViewPager) findViewById(R.id.pager);
        mViewPager.setClipToPadding(false);

        mViewPager.addOnPageChangeListener(pageList);

        // setPadding (int left, int top, int right, int bottom)
        mViewPager.setPadding(120, 0, 120, 0);
        mViewPager.setPageMargin(0);
        mViewPager.setAdapter(mCustomPagerAdapter);
        mViewPager.setCurrentItem(0);

    }

    private final View.OnClickListener nextButtonListener = new View.OnClickListener() {
        @Override
        public void onClick(View arg0) {

            app.setSmileyOne(mViewPager.getCurrentItem());

            Intent intent = new Intent(TeamMemberOneViewEmoji.this, TeamMemberOnePhrase.class);
            startActivity(intent);
            finish();
        }
    };

    public ViewPager.OnPageChangeListener pageList = new ViewPager.OnPageChangeListener()
    {
        @Override
        public void onPageSelected(int arg1)
        {
            mViewPager.playSoundEffect(SoundEffectConstants.CLICK);
           // mViewPager.playSoundEffect(AudioManager.FX_KEY_CLICK);
        }

        @Override
        public void onPageScrolled(int arg0, float arg1, int arg2)
        {
        }

        @Override
        public void onPageScrollStateChanged(int arg0)
        {
        }
    };


}
