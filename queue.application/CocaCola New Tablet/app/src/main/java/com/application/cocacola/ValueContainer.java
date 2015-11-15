package com.application.cocacola;

import android.app.Application;
import android.os.AsyncTask;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.URL;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

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
    public boolean serverAvailability;

    ArrayList<Integer> inStockEmoji;
    ArrayList<Integer> inStockEmojiId;

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
        serverAvailability = false;

        inStockEmoji = null;
        inStockEmojiId = null;
    }

    public void setInStockEmoji(ArrayList<Integer> in)
    {
        inStockEmoji = in;
    }

    public void setInStockEmojiId(ArrayList<Integer> in)
    {
        inStockEmojiId = in;
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
        smileyOneArrVal = inStockEmojiId.get(smiley);
        smileyOne = inStockEmojiId.get(smiley);
    }

    public void setSmileyTwo(int smiley)
    {
        smileyTwoArrVal = inStockEmojiId.get(smiley);
        smileyTwo = inStockEmojiId.get(smiley);
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

    public boolean checkServerAvailability()
    {
        try
        {
            new ServerConnection().execute("CHECK");
            TimeUnit.SECONDS.sleep(2);
            return getServerAvailability();
        }
        catch(InterruptedException e)
        {
            System.out.println(e);
            return false;
        }
    }

    public void setServerAvailability(boolean val)
    {
        serverAvailability = val;
    }
    public boolean getServerAvailability()
    {
        return serverAvailability;
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
                else if(params[0].equals("CHECK"))
                {
                    checkServer();
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
           // String url = "http://coke.peoplesoft.co.za/product" + paramaters;
            String url = "http://192.168.0.2:8080/product" + paramaters;
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

           // String url = "http://coke.peoplesoft.co.za/order/create";
            String url = "http://192.168.0.2:8080/order/create";
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            //add reuqest header
            con.setRequestMethod("POST");
            con.setRequestProperty("User-Agent", USER_AGENT);
            con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

            String urlParameters = order;

            // Send post request
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(urlParameters);
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();


            System.out.println("\nSending 'POST' request to URL : " + url);
            System.out.println("Post parameters : " + urlParameters);
            System.out.println("Response Code : " + responseCode);

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            //print result
            System.out.println(response.toString());
        }

       /* public boolean checkServer()
        {
            try
            {
                setServerAvailability(false);

                Runtime runtime = Runtime.getRuntime();
                Process proc = runtime.exec("ping -c 1 192.168.0.102");
                int mPingResult = proc.waitFor();
                if (mPingResult == 0)
                {
                    System.out.println("True");
                    setServerAvailability(true);
                    return true;
                }
                else
                {
                    System.out.println("False");
                    setServerAvailability(false);
                    return false;
                }
            }
            catch(Exception e)
            {
                System.out.println("Check Server exception: " + e);
                setServerAvailability(false);
                return false;
            }
        }*/

        public boolean checkServer() throws Exception
        {
            setServerAvailability(false);

            String paramaters = "?limit=1";
         //   String url = "http://coke.peoplesoft.co.za:80/product" + paramaters;
            String url = "http://192.168.0.2:8080/product" + paramaters;
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // optional default is GET
            con.setRequestMethod("GET");

            //add request header
            con.setRequestProperty("User-Agent", USER_AGENT);

            int responseCode = con.getResponseCode();
             System.out.println("\nSending 'GET' request to URL : " + url);
             System.out.println("Response Code : " + responseCode);


            if(responseCode == 200)
            {
                System.out.println("True");
                setServerAvailability(true);
                return true;
            }
            else
            {
                System.out.println("False");
                setServerAvailability(false);
                return false;
            }
        }
    }

}