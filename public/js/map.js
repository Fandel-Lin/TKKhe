let localStorage = window.localStorage
let historicalOverlay
let userPositionIcon
let map
let nearestAttraction

let attractions = [{
    name: '南一中',
    position: {lat: 22.994491, lng: 120.215901},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER, 
    content: '歷史背景：<br>    西元1922年臺灣總督府發布「臺灣教育令」，配合「日臺共學」，成立「臺南州臺南第二中學校」，有別於「一中」、「一女」為名的中學招收日人或權貴為主要目的，第二中學提供臺灣本地人就讀，原為五年制教育，但因西元1943年太平洋戰爭爆發，縮短休業年限，改為四年制教育。二戰後，國民政府接收臺灣教育，將校名從「臺南州立臺南第二中學校」改為「臺灣省立臺南第一中學」，為「三三制」完全中學。原臺南州第二中學校舍本館際講堂，作為日本人就讀的「小學校」校舍，及州立二中時期興建的禮堂，被指定為市定古蹟，為今日之小禮堂。除市定古蹟外，校內尚有臺灣府城城垣的殘跡。 <br><br>地址： 臺南市東區民族路一段1號 <br>創立年代：西元1922',
    img: '"https://upload.wikimedia.org/wikipedia/commons/b/bd/P1060292_min.jpg"',
  },{
    name: '臺南廳長官邸',
    position: {lat: 22.993790, lng: 120.214946},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER,  
    content: '歷史背景：<br>    建於西元1898～1906年間。臺南廳長官邸是日治初期三縣三廳時期，臺南地區最高行政長官臺南廳廳長的宿舍，後為臺南州知事、內務部長官邸，光復後也曾做為政府高官官邸，並派駐有警衛人員，最後作為臺南一中教職員宿舍。後來因疏於照護而荒廢，直至2017年9月修復完成重新啟用，現為臺南市長接待外賓時的接待所。建築形式採用明治時期流行的「和洋二館」式建築：北棟為西洋建築的洋館，修復後整體狀況良好，裡面擺設典雅，從內裝到家具都富有古典風格，南棟為日式建築的和館，只是因為年久失修的關係，目前和館只剩地基與地板的花磚，2017年9月14日修復完成後首次開放參觀吸引了許多民眾進入一探究竟，目前僅每周五、六、日開放民眾進入參觀。 <br><br>地址： 臺南市東區育樂街197巷2號<br>創立年代：西元1896-1906年',
    img: '"https://f.share.photo.xuite.net/apex.cheng/1f3d192/20105802/1153471304_l.jpg"',
  },{
    name: '吳園',
    position: {lat: 22.994845, lng: 120.206086},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER,
    content: ' 歷史背景：<br>   早期臺南枋橋頭的吳家，自吳春貴承販臺鹽致富，而後其子吳尚新繼承家業，於徙建洲南場後，承銷食鹽業務大為發展，家境日隆。道光初，吳尚新乃將其宅第北邊原屬荷治時期荷蘭通事何斌的庭園舊址加以收購，沿著地勢高低建構庭園，並聘名匠仿照漳州城外飛來峰的形勢，佈置假山、池臺水閣、奇花異木，極盡美觀，名為「吳園」，俗稱「樓仔內」，與板橋「林家花園」、新竹「北郭園」、霧峰「萊園」等號稱臺灣四大名園。因當時吳家的財富為府城之冠，庭園的美輪美奐，亦堪稱甲於全臺，所以臺南有句俚諺說：「有樓仔內有的富，也無樓仔內的厝；有樓仔內有的厝，也無樓仔內的富」；連雅堂於＜臺南古蹟志＞亦言：「枋橋吳氏，為府治巨室，園庭之勝甲全臺，而非來峰尤最。」可知唔加當時的財富與宅第庭園構築的精雅一般。創建至今達一百七十餘年，如今侷促臺南市區一隅，僅餘「仿飛來」假山、水池、池畔閩南平房、捲棚歇山頂四角涼亭與六角攢間涼亭各一座、石砌廊道和一畔庭園。雖大部分建築房舍外觀大異從前，但假山、水池和四角涼亭（作勵軒）尚維持一定型制，就整體而言，尚保有部份的傳統園林風格。<br><br>地址： 臺南市中西區民權路二段30號<br>創立年代：西元1828年 ',
    img: '"https://7.share.photo.xuite.net/superkiwi1218/17c8185/17586041/953794316_m.jpg"',
  },{
    name: '台南公會堂',
    position: {lat: 22.994367, lng: 120.205988},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER,
    content: '歷史背景：<br>   建於西元 1911  年，由中央入口、兩側翼部以及後棟大會堂所組成。公會堂前棟，形式為西方歷史式樣，屋頂是極為特殊的形式，成為其不同於其他建築的重要特色。中央入口部分可視為由兩根兩層樓高方柱撐起之三角形山牆所構成，為全棟建築最高之屋頂，兩根方柱內側為闈內凹一圓拱圈。兩翼部分，高兩層樓約十二米，採磚砌承重構造。大會堂，與本體正後方斜接，因教著重機能，外觀簡單樸素，大會堂後部舞臺下方有一磚砌拱圈構造的地下室，可能為因應基地高差而設置的擋土結構基礎。<br><br>地址： 臺南市中西區民權路二段30號<br>創立年代：西元1911年 ',
    img: '"http://www.tnwcdo.gov.tw/warehouse/E00/10213001.jpg"',
  },{
    name: '禾寮港',
    position: {lat: 22.997324, lng: 120.204479},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER,
    content: '歷史背景：<br>   早期禾寮港用於貨運運輸，為五條港新港德慶溪下游西段，其中在現今民族路與成功路之間的溪段，現已地下化（忠義路二段202巷）。遠在荷據時代已有不少人居住於禾寮港兩側，西元1661年鄭成功便由此登岸的，因附近街市稱之為禾寮街，故稱之為禾寮港。<br><br>地址：臺南市中西區忠義路二段202巷'   ,
    img: '"https://upload.wikimedia.org/wikipedia/commons/a/a0/1752%E5%B9%B4%E8%87%BA%E7%81%A3%E5%BA%9C%E5%9F%8E%E7%A6%BE%E5%AF%AE%E6%B8%AF%E8%A1%97.jpg"',
  },{
    name: '民族戲院',
    position: {lat: 22.996417, lng: 120.204369},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER,
    content: '歷史背景：<br>   民族戲院在1963年開幕。在其他戲院都紛紛轉型求生存的艱苦年代，民族戲院的生意維持很好，因為臨近繁華的民族夜市。民族夜市是街道型夜市，沿著民族路一路從赤崁樓到現在中山路老曾羊肉附近，繁華興盛的場面看照片就知道。由於夜市人潮嚴重影響交通與衛生，所以當時市長蘇南成大刀闊斧拆除民族夜市。間接導致民族戲院失去人潮而走下坡，民族戲院正式在2000年結束營業。現已成為補習班，但外牆仍有部分當年戲院的痕跡。 <br><br>地址： 臺南市中西區民族路二段249號<br>創立年代：西元1963年' , 
    img: '"http://i.imgur.com/8OFaeBE.jpg"',
  },{
    name: '大觀音亭',
    position: {lat: 22.998673, lng: 120.206108},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER,
    content: '歷史背景：<br>   臺灣各地廟宇專祀觀世音菩薩者眾多，相傳位於臺南市北區的「大觀音亭」為臺灣主祀觀音菩薩之首寺。大觀音亭創建於明永曆年間，原稱「觀音亭」，又稱「觀音廟」、「觀音宮」等；後來為相對於府城小東門內的觀音亭，而習稱「大觀音亭」，自古以來便有「臺疆祖廟」的美譽，是臺灣主祀觀音佛祖的古剎之一。臺南市之觀音亭有三處，分是成功路的大觀音亭、正義街的慈蔭亭及安平觀音亭。大觀音亭創建於明永歷年間，其後在清乾隆、嘉慶及日據時的大正、昭和時期，先後經多次的整修，迨臺灣光復後，民國三十八年再次進行重修，完成今日所見全貌。主祀神觀世音菩薩及其他副祀的神明，因歷史久遠，富有許多具有價值的古文物，如：對聯、木作雕刻、石刻、多件碑碣文物等。中隔官廳與「興濟宮」相鄰，兩者也是全臺唯一設有官廳的廟宇。 「興濟宮」同樣肇建於明永曆年間，奉祀保生大帝；「大觀音亭」與「興濟宮」雖是一佛一道，卻是同祀一地，十分獨特。「大觀音亭」主祀觀世音菩薩，格局為三開間三進式。三川門以「凹壽」形式呈現，如同雙臂，象徵佛祖慈悲，接納十方眾生；正脊飾以剪黏之道教特色「福祿壽」三仙；垂脊由左而右分飾象徵佛教特色「風調雨順」四大天王；正殿脊飾「王母娘娘」更是罕見，別具特色。中門則繪以韋馱、伽藍護法、另有二金剛力士旁侍側門，皆出於民族藝師陳壽彝之手 ─其作品風格描繪精細，並以金色粉線勾勒輪廓，獨具創意。 進入亭中，有哼哈二將分立兩旁，護持佛寺與佛法；殿堂之上有南海觀世音菩薩法相金面，十八羅漢分祀兩側；左祀月下老人，掌管人間男女姻緣；右奉註生娘娘、花公花婆，求賜麟兒、護祐長成；更配祀齊天大聖孫悟空，專治桀驁不馴或「著猴」驚嚇的小孩，亦祀達摩祖師，可謂祈祐周全。後殿為大雄寶殿，主祀三寶佛（即釋迦牟尼佛、阿彌陀佛、藥師佛）、觀音菩薩、大勢至菩薩，並有藏密白教傳人貢噶老人所獻之「人天師表」匾一方，脅侍韋馱與伽藍兩位護法，左右分別配祀地藏王菩薩及監齋普薩、妙莊王，共同塑造佛門淨地。「興濟宮」主祀保生大帝(又稱「大道公」、「吳真君」)，採華南建築。正脊飾雙龍朝三星，龍身各塑神將手持環作馭龍狀；脊垛凸塑鳳凰、獅、虎等瑞獸，雕鏤皆十分精細；正殿中奉祀保生大帝。宮內後殿屋脊屬於燕尾硬山式之風格，上覆青筒瓦、綠釉瓦當、滴水，古意盎然；正龕敬奉文衡聖帝、三官大帝、聖父母、南斗星君、北斗星君，另有中壇元帥、福德正神分祀左右龕。<br><br>地址：臺南市北區成功路86號 <br>電話： 06-2286720 <br>主祀神明：保生大帝、觀世音菩薩 <br>創立年代：西元1647年' , 
    img: '"https://upload.wikimedia.org/wikipedia/commons/a/a6/%E8%87%BA%E5%8D%97%E8%88%88%E6%BF%9F%E5%AE%AE.JPG"',
  },{
    name: '開基天后祖廟',
    position: {lat: 22.999823, lng: 120.202720},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER,
    content: '歷史背景： <br>   創建於西元1662年，位於當時鎮北坊德慶溪出口南岸的水仔尾，是臺南市最早興建的媽祖廟，故以開基冠稱。鄭成功治臺後，感恩昔日馬祖庇佑鄭軍順利登港，將開基天后宮易茅為瓦，易寮為廟，冠以「開基」，因不及大天后宮的規模及寬敞，俗稱「小媽祖廟」。是一座二進縱深式建築，坐東朝西。第一進為前殿，第二進為拜亭的正殿，但因拜亭與前殿之間，沒有內埕分隔，渾然成為一體。正殿供奉馬祖神像，左右配祀千里眼、順風耳兩將軍神像，第三進為後殿，祀奉觀世音菩薩。     <br><br>地址： 臺南市北區自強街12號  <br>創立年代：西元1662年',
    img: '"http://web.topwin.com.tw/WalkToTaiwan/UpLoad/Photo/F00002159.jpg"',
  },{
    name: '鴨母寮市場',
    position: {lat: 22.999353, lng: 120.204311},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER,
    content: '歷史背景： <br>   鴨母寮市場名稱由來有不同說法，較為採信之說法為，當時市場旁有戶住家養鴨，因常將鴨放養在德慶溪流上，鴨母多在水中下蛋，主人再於溪中撈取鴨蛋而得名。日治時期稱之為「明治分市場」，光復後改為「光復市場」，但老臺南人還是喜稱為鴨母寮市場，直至西元2007年才正名為「鴨母寮市場」。鴨母寮市場已近三百年歷史，是臺南市重要的市集之一，許多臺南人從小便隨父母在其市場中採買物品，在生長過程中佔有極大的地位。<br><br>地址：臺南市中西區民權路二段30號<br>創立年代：西元1911年 ',
    img: '"http://web.topwin.com.tw/WalkToTaiwan/UpLoad/Photo/F00002159.jpg"',
  },{
    name: '拱乾門',
    position: {lat: 23.001191, lng: 120.199204},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER,
    content: '歷史背景： <br>   清道光12年張丙之亂(西元1832年)後，於大西門之外加建三座城門，以加強安全，拱乾門為其中之一，位於北邊，剛好在小北門之西南側，於德慶溪北側，距離相當近，日治時期因都市改正而拆除。<br> <br>地址:<br>   台南市北區臨安路二段與民德路交叉口<br>創立年代:清道光13年(西元1833年)地址： 臺南市北區海安路三段12號 創立年代：西元1832年',
    img: '"../images/door.jpg"',
  },{
    name: '台南三山國王廟',
    position: {lat: 23.001676, lng: 120.202986},
    type: 'monuments',
    distance: Number.MAX_SAFE_INTEGER,
    content: '歷史背景: <br>   於清乾隆7年（西元1742年），由臺灣知縣楊允璽、臺灣鎮標左營游擊林夢熊和粵東商民集資興建，於德慶溪旁。主祭為三山國王，左右祠分別為媽祖與韓文公，曾有多次整修，於嘉慶7年(西元1802年)於廟後方設置會館(因此又稱潮汕會館)，以供來往台灣與中國大陸的潮州人休息居住，也是潮州人的聚會場所；而到日治時期(西元1899年)，總督府於此設置「台南師範學校」，後擴編改制成「台灣總督府國語學校設立台南分校」，並遷到赤崁樓，後廟產曾遭盜賣，韓文公祠與媽祖祠曾變成肥料倉庫，民國以後，廟產因收歸國有，缺乏管理，到五十三年（西元1964年）申請宗教團體登記後，才由臺南市潮汕同鄉會管理，後來有多次整修政府亦有出資。<br> 特色:<br>   建材自潮州運來，並為潮州匠師所興建，因此屬潮州式風格，為台灣唯一純粹廣東式建築，各祠皆有他的前殿、正殿及院落，與臺灣廟宇常見之閩南式建築有許多差異，如:內部有許多大小天井，有通風及採光的功能，廟牆以磚疊砌，再塗以白灰，無牆堵裝飾；屋頂平直僅兩端稍微上翹，不像閩南式的大幅度翹起，且屋頂使用黑瓦，有別於閩南式使用的紅瓦，垂脊為貼陶及花草飾物，造型樸質。正殿中的花瓶形月門，綠漆描邊，配以泥飾花卉枝葉，是一大特色。殿內存有清匾、鐘爐、旗杆等古物及碑記，其中「褒忠匾」為清乾隆所賜，相當珍貴。整體設計樸實，目前為二級古蹟。活動: 慶元宵，賽水仙 : 元宵時，會放煙火及水仙花展，並演奏潮州之樂、劇，以答謝神明，在日治時期因九一八事變被禁止，民國後漸恢復。<br> <br>地址: 台南市北區西門路三段100號<br>創立年代:西元1742年',
    img: '"https://pic.easytravel.com.tw/Attachments/18/2194/m/001.jpg"',
  }
]


function MapControl(controlDiv, map, title, icon, func){

  //Set CSS for the control border.
  var controlUI = document.createElement('div')
  controlUI.style.backgroundColor = '#fff'
  controlUI.style.border = '2px solid #fff'
  controlUI.style.borderRadius = '100px'
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlUI.style.cursor = 'pointer'
  controlUI.style.margin = '9px'
  controlUI.style.textAlign = 'center'
  controlUI.title = title
  controlDiv.appendChild(controlUI)

  // Set CSS for the control interior.
  var controlText = document.createElement('div')
  controlText.style.color = 'rgb(25,25,25)'
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
  controlText.style.color = '#663300'
  controlText.style.fontSize = '25px'
  controlText.style.lineHeight = '45px'
  controlText.style.paddingLeft = '10px'
  controlText.style.paddingRight = '4px'
  controlText.innerHTML = '<i class=' + icon +'></i>'
  controlUI.appendChild(controlText)

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {
    func()
  })

}

// initial map
function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: 22.99721, lng: 120.211818},
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false
  })
  
  //historicalOverlay
  let imageBounds = {
    north: 23.00242,
    south: 22.98685,
    east: 120.2185,
    west: 120.1980
  }

  historicalOverlay = new google.maps.GroundOverlay(
    '../images/ttk_map1.png',
    imageBounds);
  historicalOverlay.setMap(map)

  //set attractions
  let icons = {
    monuments: '../images/bank.png'
  }
  
  //create attractions
  attractions.forEach((attraction) =>  {

    var marker = new google.maps.Marker({
      position: attraction.position,
      //icon: icons[attraction.type],
      map: map,
      label: {
        text: attraction.name, 
        color: '#000', 
        fontSize:'20px', 
        fontWeight: '8px', 
        fontFamily:' Microsoft JhengHei'
      },
      title: attraction.name
    })

    var infowindow = new google.maps.InfoWindow({
      content: attraction.content,
      maxWidth: 320
    })


    marker.addListener('click', function() {
      $('#infoTitle').html('<h1>'+attraction.name+'</h1>')
      $('#infoImg').css('background', 'url('+ attraction.img +') center center')
      $('#infoImg').css('background-size', 'cover')
      $('#infoContent').html('<p>'+attraction.content+'</p>')
      $('#info').show()
      $.ajax({
        method: "post",
        url: "./get_comment",
        data: {
          attraction_name: attraction.name
        },
        success: function(contents) {
          contents.forEach((content) => {
            $('#infoContent').append(
              '<div class="commentContainer">'+
                '<p class = "userName">'+content.userName+'</p>'+
                '<p class = "comment">'+content.comment+'</p>'+
              '</div>'
            )
          })
          console.log(contents)  
        }
      })
    })
    
  })
  
  //controlUI
  var tutorControlDiv = document.createElement('div')
  var overLayControlDiv = document.createElement('div')
  var centerControlDiv = document.createElement('div')

  let tutorTitle = 'Click to start tutorial'
  let overLayTitle = 'Click to swtich the map'
  let centerTitle =  'Click to recenter the map'

  let tutorIcon = '"volume up icon"'
  let overLayIcon = '"map icon"'
  let centerIcon = '"crosshairs icon"'

  let tutorFunc = () => console.log('aaa')
  let overLayFunc = () => {
    if(historicalOverlay.map){
      historicalOverlay.setMap(null)
    }else{
      historicalOverlay.setMap(map)
    }
  }
  let centerFunc = () => {
    getGeolocation().then( pos =>{
      map.setCenter(pos)
      userPositionIcon.setPosition(pos)
      setAttr(pos)
    })
  }

  var tutuorControl = new MapControl(tutorControlDiv, map, tutorTitle, tutorIcon, tutorFunc)
  var overLayControl = new MapControl(overLayControlDiv, map, overLayTitle, overLayIcon, overLayFunc)
  var centerControl = new MapControl(centerControlDiv, map, centerTitle, centerIcon, centerFunc)
  
  tutorControlDiv.index = 1
  overLayControlDiv.index = 2
  centerControlDiv.index = 3
  
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(tutorControlDiv)
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(overLayControlDiv)
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv)
  
  
  //default position
  userPositionIcon = new google.maps.Marker({
    position: {lat: 22.99721, lng: 120.211818},
    map: map
  })

  //geolocation
  if (navigator.geolocation) {
    getGeolocation().then(pos => {
      map.setCenter(pos)
      userPositionIcon.setPosition(pos)
      setAttr(pos)
    })  
  } else{
    consol.log('Geolocation is not supported by your browser')
  }

}


let getCamera = () => {
  navigator.mediaDevices.getUserMedia({video: true})
  .then(gotMedia)
  .catch(error => console.error('getUserMedia() error:', error));
}

let gotMedia = (mediaStream) => {
  const mediaStreamTrack = mediaStream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(mediaStreamTrack);
  const img = document.querySelector('img');
  
  imageCapture.takePhoto()
  .then(blob => {
    img.src = URL.createObjectURL(blob);
    img.onload = () => { URL.revokeObjectURL(this.src); }
  })
  .catch(error => console.error('takePhoto() error:', error))
}

let getGeolocation = () => {
  return new Promise((resolve) =>{
    navigator.geolocation.getCurrentPosition((position)=>{
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      resolve(pos)

    })
  })
}



let updateDistance = user => {
  return Promise.all(
    attractions.map(attr => {
      let delLat = attr.position.lat - user.lat
      let delLng = attr.position.lng - user.lng
      attr.distance = Math.sqrt(delLat*delLat + delLng*delLng)
      return Promise.resolve('updated')
    })
  )
}

let nearestAttr = (user) =>{ 
  return new Promise((resolve) =>{
    updateDistance(user).then(() => {
      let attrArr = attractions.map(attr =>{
        return Promise.resolve(attr.distance)
      })

      Promise.all(attrArr).then(distances => {
        attractions.forEach(attr => {
          if (attr.distance == Math.min(...distances)){
            resolve(attr)  
          }
        })
      })
    })  
  })
}

let setAttr = (user) => {
  nearestAttr(user).then(attr=>{
    $('#nearestAttraction').html('<i class="flag icon"></i><p>'+attr.name+'</p>')
    $('#exp-title').html('<i class="edit icon"></i><p>'+attr.name+'</p>')
    nearestAttraction = attr
  })
}

const inConstruction = () => {
    if($('#camera').css('display') == 'none'){
      $('#camera').show()
    }else{
      $('#camera').hide()
    }
  }

const hintAttraction = () => {
    
}

$(document).ready(() => {
  //check if visited
  $.ajax({
    method: "post",
    url: "./visited",
    data: {
      user_id    : localStorage.user_id ,
      user_name  : localStorage.user_name
    },
    success: function(visited) {
      if(!visited){console.log('tutor')}
      //tutor()
    }
  })

  $('#nearestAttraction').click(()=>{
    map.setCenter(nearestAttraction.position) 
    hintAttraction()  
  })

  $('.camera').click(inConstruction)
  $('.heart').click(inConstruction)
  $('.share').click(inConstruction)
  $('#camera').click(inConstruction)
  
  $('.edit').click(() => {
    if($('#experience').css('display') == 'none'){
      $('#experience').show()
    }else{
      $('#experience').hide()
    }
  })

  $('#experience .times').click(() => $('#experience').hide())
  $('#info .times').click(() => $('#info').hide())

  $(".custButton.light").click(() => $('#experience').hide())

  $(".custButton.dark").click(() => {
    event.preventDefault();//取消reload
    $.ajax({
      method: "post",
      url: "./comment",
      data: {
        attraction: nearestAttraction.name,
        userName  : localStorage.user_name,
        comment   : $("#experience textarea").val()
      },
      success: function(data) {
        console.log(data)  
      }
    })
    $("#experience textarea").val('')
    $('#experience').hide()
  })  

})
