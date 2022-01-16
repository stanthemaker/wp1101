# StocKalendar

# 基本介紹

---

股票是許多人離不開的日常，股市的波動也影響著投資人一整天的心情。然而，既有的Web都只有枯燥的數字與線圖。Stockalendar希望帶給用戶更生活化、更輕鬆的投資體驗，再加上客製化的數學模型，讓投資人可以更自在的探索股市。

# **如何在 localhost 安裝**

---

1. git clone [git@github.com](mailto:git@github.com):stanthemaker/wp1101.git
2. cd wp1101/final/backend 
3. yarn 
4. 在/backend 底下新增一個 .env 檔
    
    ```jsx
    MONGO_URL = <your mongodb url>
    TOKEN_KEY = tokenkeyforfinalproject
    ```
    
5. cd ../frontend
6. yarn 
7. 在/frontend底下新增一個 .env檔
    
    ```jsx
    REACT_APP_BASE_URL = http://localhost:5000
    ```
    
8. cd ..
9. 分別開兩個terminal，在wp1101/final/底下 yarn server , yarn start

# 可以在localhost測試的項目(即整個Web的功能)

---

- 如果瀏覽器有存東西的話，請先把他清掉，因為如果是invalid token，App一直loading
    
    ![https://i.imgur.com/eRb7p7y.jpg](https://i.imgur.com/eRb7p7y.jpg)
    
1. 註冊一個新的帳戶(個資只會存在DB不會外流)
    
    ![https://i.imgur.com/vNKzhWc.png](https://i.imgur.com/vNKzhWc.png)
    
2. 用新註冊帳號密碼登入(**密碼有用bcript加密過後存在DB裡面**)
    
    ![https://i.imgur.com/dts6hbe.png](https://i.imgur.com/dts6hbe.png)
    
3. HomePage:
    1. 右上角有”Hi,<username>”
    2. login 之後，會把user token 存到瀏覽器，在任何頁面按重新整理都會回到首頁，並且保持登入狀態
    3. 背景圖會隨日期改變
        
        ![https://i.imgur.com/rkK8u8v.png](https://i.imgur.com/rkK8u8v.png)
        
    4. 可以看到real-time不定時更新的US economy news (稍微往下滑一點)
        
        ![https://i.imgur.com/HaJKvPz.png](https://i.imgur.com/HaJKvPz.png)
        
4. myFavorite:
    1. 可以用股票代號任意新增股票到我的最愛(每次輸入完記得要按”**Enter**”)
        1. (參考)一些股票代號: AAPL,QCOM,TSLA,BABA...
        2. (備註) 目前**只支援美股與台股的個股，不支援基金**
        3. 有些股票的圖片顯示”picture not found”是正常現象
        
        ![https://i.imgur.com/nYqB1dk.png](https://i.imgur.com/nYqB1dk.png)
        
    2. 可以任意刪除我的最愛的股票(remove)
    3. 所有變更在重新整理之後，仍然存在
    4. 呈現上次收盤時的股價與漲跌(這裡的漲跌幅是根據上個月的平均股價計算，比較特別)
        
        ![https://i.imgur.com/pjkoUGJ.png](https://i.imgur.com/pjkoUGJ.png)
        
5. Model:
    
    提供價值投資人(value investing investor)友善的平台。
    
    1. 在model欄位輸入不等式(記得輸入完按”Enter”)
        1. model支援變數:(這些變數都是公司的財務數字，基本面投資人常常需要這類資訊幫助他們選股) **P**代表**本益比、R**代表**股東權益報酬率、G**代表**毛利率、C**代表**流動比率**
        2. 如果不懂那些變數代表甚麼也沒關係，就當作未知的x y z 隨便輸入也沒關係
        3. 可以測試輸入各種奇怪的公式測試防呆(按下”Enter”之後會有error message)
    2. 在company欄位輸入你想要跑model的公司ticker(每輸入完一個ticker要按”**Enter**”)
        1. (備註) 目前**只支援美股與台股的個股，不支援基金**
        2. 可以輸入invalid ticker測試防呆(按下”start”之後會有error message), ex:KJHGFDFHJKHFD
    3. 按 “import Nasdaq100”可以匯入real-time的那斯達克指數所涵蓋的100個company tickers
        - 因為Heroku平台能力不足，容易超載，此功能在deploy的版本暫不能work。
        
        ![https://i.imgur.com/ixPS3NE.png](https://i.imgur.com/ixPS3NE.png)
        
    4. 按最底下的”Start button”開始跑你所輸入的模型與ticker
        1. 如果一次要跑很多company tickers，需要花一點時間
    5. 跑完模型後，可以在右側按愛心icon，把通過模型的ticker加到我的最愛
        
        ![https://i.imgur.com/2JIZsnP.png](https://i.imgur.com/2JIZsnP.png)
        

# 使用到的套件與模組

---

- frontend:Material-UI, axios,React.js,moment.js,antd,styled-components,react-router
- backend:bcrypt, axios, mongoose,cookie-parser,expr-eval,jsonwebtoken,express

# Contributors

---

- 翁瑋杉 B09901104 :backend、web crawling
- 黃筱穎 B09901046 :api connect、 JWT、router、structure
- 楊倢綺 B09901055 :UI/UX design 、structure