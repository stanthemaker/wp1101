# StocKalendar

# 基本介紹

---

股票是許多人離不開的日常，也正因如此，投資人的心情或多或少也受到股市波動影響。因此我們想到用日曆的形式，結合股市app，創造一個美觀的投資環境，讓投資人忘卻股票虧損的痛苦，並且加上更多客製化功能，彌補市面上股市app的不足處。

# **如何在 localhost 安裝**

---

1. git clone [git@github.com](mailto:git@github.com):stanthemaker/wp1101.git
2. cd wp1101/final/backend 
3. yarn 
4. 新增一個 .env 檔
    
    ```jsx
    MONGO_URL = mongodb+srv://stanwpfinal:ihatehackathon@cluster0.wyg8z.mongodb.net/final?retryWrites=true&w=majority
    TOKEN_KEY = tokenkeyforfinalproject
    ```
    
5. cd ../frontend
6. yarn 
7. cd ..
8. 分別開兩個terminal，在wp1101/final/底下 yarn server , yarn start

# 可以在localhost測試的項目(即整個Web的功能)

---

1. 註冊一個新的帳戶(個資只會存在DB不會外流)

![Untitled](StocKalendar%20b7914503a8e74b27806335e52f2ce98a/Untitled.png)

1. 用新註冊帳號密碼登入(**密碼有用bcript加密過後存在DB裡面**)

![Untitled](StocKalendar%20b7914503a8e74b27806335e52f2ce98a/Untitled%201.png)

1. HomePage:
    1. 右上角有”Hi,<username>”
    2. login 之後，會把user token 存到瀏覽器，在任何頁面按重新整理都會回到首頁，並且保持登入狀態
    3. 背景圖會隨日期改變
        
        ![Untitled](StocKalendar%20b7914503a8e74b27806335e52f2ce98a/Untitled%202.png)
        
    4. 可以看到real-time不定時更新的US economy news (稍微往下滑一點)
        
        ![Untitled](StocKalendar%20b7914503a8e74b27806335e52f2ce98a/Untitled%203.png)
        
2. myFavorite:
    1. 可以用股票代號任意新增股票到我的最愛(每次輸入完記得要按”**Enter**”)
        1. (參考)一些股票代號: AAPL,QCOM,TSLA,BABA...
        2. (備註) 目前**只支援美股與台股的個股，不支援基金**
        3. 有些股票的圖片顯示”picture not found”是正常現象
        
        ![Untitled](StocKalendar%20b7914503a8e74b27806335e52f2ce98a/Untitled%204.png)
        
    2. 可以任意刪除我的最愛的股票(remove)
    3. 所有變更在重新整理之後，仍然存在
    4. 呈現上次收盤時的股價與漲跌(這裡的漲跌幅是根據上個月的平均股價計算，比較特別)
    
    ![Untitled](StocKalendar%20b7914503a8e74b27806335e52f2ce98a/Untitled%205.png)
    
3. Model:
    
    提供價值投資人(value investing investor)友善的平台。
    
    1. 在model欄位輸入不等式(記得輸入完按”Enter”)
        1. model支援變數: **P**代表**本益比、R**代表**股東權益報酬率、G**代表**毛利率、C**代表**流動比率**
        2. 可以測試輸入各種奇怪的公式測試防呆(按下”Enter”之後會有error message)
    2. 在company欄位輸入你想要跑model的公司ticker(每輸入完一個ticker要按”**Enter**”)
        1. (備註) 目前**只支援美股與台股的個股，不支援基金**
        2. 可以輸入invalid ticker測試防呆(按下”start”之後會有error message), ex:KJHGFDFHJKHFD
    3. 按 “import Nasdaq100”可以匯入real-time的那斯達克指數所涵蓋的100個tickers
        
        ![Untitled](StocKalendar%20b7914503a8e74b27806335e52f2ce98a/Untitled%206.png)
        
    4. 按最底下的”Start button”開始跑你所輸入的模型與ticker
        1. 如果一次要跑很多company tickers，需要花一點時間
    5. 跑完模型後，可以在右側按”Add all to my favorite”以加入所有tickers到我的最愛
    
    ![Untitled](StocKalendar%20b7914503a8e74b27806335e52f2ce98a/Untitled%207.png)
    

# 分工

---

- 翁瑋杉 B09901104 :backend、爬蟲(發各種API requests 去其他server抓資料)
- 黃筱穎 B09901046 :api connect、 JWT、router、structure
- 楊倢綺 B09901055 :UI/UX design 、structure