package com.application.cocacola;

import android.app.Application;
import android.os.AsyncTask;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class ValueContainer extends Application{

    public String teamName;
    public int smileyOne;
    public int smileyTwo;
    public int stickerOne;
    public int stickerTwo;
    public int smileyOneArrVal;
    public int smileyTwoArrVal;

    public int smileyOneQty;
    public int smileyTwoQty;
    public int smileyThreeQty;
    public int smileyFourQty;
    public int smileyFiveQty;
    public int smileySixQty;

    public int stickerFunQty;
    public int stickerTogetherQty;
    public int stickerHolidayQty;
    public int stickerSummerQty;
    public int stickerForeverQty;
    public int stickerLoveQty;

    public boolean checkedQty;
    public boolean successfulOrder;

    public ValueContainer()
    {
        teamName = "";
        smileyOne = -1;
        smileyTwo = -1;
        stickerOne = -1;
        stickerTwo = -1;
        smileyOneArrVal = -1;
        smileyTwoArrVal = -1;

        smileyOneQty = -1;
        smileyTwoQty = -1;
        smileyThreeQty = -1;
        smileyFourQty = -1;
        smileyFiveQty = -1;
        smileySixQty = -1;

        stickerFunQty = -1;
        stickerTogetherQty = -1;
        stickerHolidayQty = -1;
        stickerSummerQty = -1;
        stickerForeverQty = -1;
        stickerLoveQty = -1;

        checkedQty = false;
        successfulOrder = false;
    }

    public boolean getcheckedQty()
    {
        return checkedQty;
    }

    public void setcheckedQty(boolean val)
    {
        checkedQty = val;
    }


    public void setTeamName(String name)
    {
        teamName = name;
    }

    public void setSmileyOne(int smiley)
    {
        if(smiley == 0)
        {
            smileyOne = 7;
        }
        else if(smiley == 1)
        {
            smileyOne = 8;
        }
        else if(smiley == 2)
        {
            smileyOne = 9;
        }
        else if(smiley == 3)
        {
            smileyOne = 10;
        }
        else if(smiley == 4)
        {
            smileyOne = 11;
        }
        else if(smiley == 5)
        {
            smileyOne = 12;
        }

        smileyOneArrVal = smiley;
    }

    public void setSmileyTwo(int smiley)
    {
        if(smiley == 0)
        {
            smileyTwo = 7;
        }
        else if(smiley == 1)
        {
            smileyTwo = 8;
        }
        else if(smiley == 2)
        {
            smileyTwo = 9;
        }
        else if(smiley == 3)
        {
            smileyTwo = 10;
        }
        else if(smiley == 4)
        {
            smileyTwo = 11;
        }
        else if(smiley == 5)
        {
            smileyTwo = 12;
        }

        smileyTwoArrVal = smiley;
    }

    public void setStickerOne(int sticker)
    {
        stickerOne = sticker;
    }

    public void setStickerTwo(int sticker)
    {
        stickerTwo = sticker;
    }



    public void setSmileyOneQty(int qty)
    {
        smileyOneQty = qty;
    }

    public void setSmileyTwoQty(int qty)
    {
        smileyTwoQty = qty;
    }

    public void setSmileyThreeQty(int qty)
    {
        smileyThreeQty = qty;
    }

    public void setSmileyFourQty(int qty)
    {
        smileyFourQty = qty;
    }

    public void setSmileyFiveQty(int qty)
    {
        smileyFiveQty = qty;
    }

    public void setSmileySixQty(int qty)
    {
        smileySixQty = qty;
    }





    public void setStickerFunQty(int qty)
    {
        stickerFunQty = qty;
    }

    public void setStickerTogetherQty(int qty)
    {
        stickerTogetherQty = qty;
    }

    public void setStickerHolidayQty(int qty)
    {
        stickerHolidayQty = qty;
    }

    public void setStickerSummerQty(int qty)
    {
        stickerSummerQty = qty;
    }

    public void setStickerForeverQty(int qty)
    {
        stickerForeverQty = qty;
    }

    public void setStickerLoveQty(int qty)
    {
        stickerLoveQty = qty;
    }






    public String getTeamName()
    {
        return teamName;
    }

    public int getSmileyOne()
    {
        return smileyOne;
    }

    public int getSmileyTwo()
    {
        return smileyTwo;
    }

    public int getStickerOne()
    {
        return stickerOne;
    }

    public int getStickerTwo()
    {
        return stickerTwo;
    }

    public int getSmileyOneArrVal()
    {
        return smileyOneArrVal;
    }

    public int getSmileyTwoArrVal()
    {
        return smileyTwoArrVal;
    }


    public String createOrder()
    {
        String order = "teamName="+getTeamName()+"&smileyOne="+getSmileyOne()+"&smileyTwo="+getSmileyTwo()+"&stickerOne="+getStickerOne()+"&stickerTwo="+getStickerTwo();
        new ServerConnection().execute("POST", order);
        return order;
    }


    public void getQuantities()
    {
        new ServerConnection().execute("GET");
    }

    public void setSuccessful(boolean value)
    {
        successfulOrder = value;
    }

    public boolean getSuccessful()
    {
        return successfulOrder;
    }


    public class ServerConnection extends AsyncTask<String, Void, Void> {
        private final String USER_AGENT = "Mozilla/5.0";

        @Override
        protected Void doInBackground(String... params) {

		/*int size = params.length;
		for (int i=0;i<size;i++)
			System.out.println(params[i]);*/

            try
            {
                if (params[0].equals("GET"))
                {
                    setSmileyOneQty(sendGet("7"));
                    setSmileyTwoQty(sendGet("8"));
                    setSmileyThreeQty(sendGet("9"));
                    setSmileyFourQty(sendGet("10"));
                    setSmileyFiveQty(sendGet("11"));
                    setSmileySixQty(sendGet("12"));

                    setStickerFunQty(sendGet("1"));
                    setStickerTogetherQty(sendGet("2"));
                    setStickerHolidayQty(sendGet("3"));
                    setStickerSummerQty(sendGet("4"));
                    setStickerForeverQty(sendGet("5"));
                    setStickerLoveQty(sendGet("6"));

                }
                else if (params[0].equals("POST"))
                {
                    sendPost(params[1]);
                }
            }
            catch(Exception e)
            {
                e.printStackTrace();
            }

            return null;
        }


        // HTTP GET request
        public int sendGet(String id) throws Exception	{

            String paramaters = "?id=" + id;
            //String url = "http://coke.peoplesoft.co.za/product" + paramaters;
            String url = "192.168.0.2:8080/product" + paramaters;
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // optional default is GET
            con.setRequestMethod("GET");

            //add request header
            con.setRequestProperty("User-Agent", USER_AGENT);

            int responseCode = con.getResponseCode();
           // System.out.println("\nSending 'GET' request to URL : " + url);
           // System.out.println("Response Code : " + responseCode);

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            //print result
            //System.out.println(response.toString());


            Gson g = new Gson();
          //  System.out.println(g.toJson(response));
            JsonObject jsonObject = new JsonParser().parse(response.toString()).getAsJsonObject();

           // System.out.println(jsonObject.get("qty").getAsString());

            return Integer.parseInt(jsonObject.get("qty").getAsString());
        }

        // HTTP POST request
        public void sendPost(String order) throws Exception {

            //String url = "http://coke.peoplesoft.co.za/order/create";
            String url = "192.168.0.2:8080/order/create";
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            //add reuqest header
            con.setRequestMethod("POST");
            con.setRequestProperty("User-Agent", USER_AGENT);
            con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

            //String urlParameters = "teamName=teamOne&smileyOne=10&smileyTwo=7&stickerOne=1&stickerTwo=5";
            String urlParameters = order;

            // Send post request
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(urlParameters);
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();

            if(responseCode == 201 || responseCode == 202)
            {
                setSuccessful(true);
            }
            else
            {
                setSuccessful(false);
            }

            //System.out.println("\nSending 'POST' request to URL : " + url);
            //System.out.println("Post parameters : " + urlParameters);
            System.out.println("Response Code : " + responseCode);

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();



            //print result
           // System.out.println(response.toString());
        }
    }

}