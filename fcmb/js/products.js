$(".plans-selector").change(function() {
    window.state=$(this).val();
    plan = addCommas($(this).val() * 0.2);
    cat = $(this).closest('.options').attr('id')

    if (cat == 'MOBILE-A4'){
        header = ['PRODUCTS', 'PRICE (N)', 'COMPONENTS', 'BATTERY CAPACITY', 'PANEL CAPACITY', 'WORKING HOURS', 'EXTRA WORKING HOURS' ]
        switch (state) {
            case "27000": var data=['10 WATTS', '27,000', '3 PIECES OF 2WATTS BULBS, RADIO, 2 USB PORT FOR PHONE CHARGING WITH MULTI PURPOSE CABLE.',
                    '4000 MAH, 44.4WATT/HOUR', 'LITHIUM-ION ,POLY , 10 WATTS', '5 HOURS', '8 HOURS WITH ONLY ONE OR TWO BULBS ON.'];
            break;
            case "57000": var data=['30 WATTS', '57,000', '3 PIECES OF 3 WATTS BULBS, A STANDING FAN, 1 USB PORT FOR PHONE CHARGING WITH MULTIPURPOSE CABLE, 5 LIGHT POINTS,',
                    '14000 MAH, 155WATT/HOUR', 'LITHIUM-ION ,POLY , 30 WATTS', '10 HOURS OF BULB AND FAN', '14 HOURS OF BULB ALONE'];
            break;       
            case "85000": var data=['60 WATTS', '85,000', '3 PIECES OF 2 WATTS BULBS, A STANDING FAN, 1 USB PORT FOR PHONE CHARGING WITH MULTIPURPOSE CABLE, 5 LIGHT POINTS,',
                    '24,000 MAH 266WATT/HOUR', 'LITHIUM-ION ,POLY, 60 WATTS', '12 HOURS OF BULB AND FAN', '18 HOURS OF BULB ALONE '];
            break;
            case "145000": var data=['100 WATTS', '145,000 (185,000 with 32”TV)', '4 PIECES OF 5WATTS BULBS, A STANDING FAN, 2USB PORT FOR PHONE CHARGING WITHMULTIPURPOSE CABLE, 5 LIGHT POINTS,',
                    '48,000 MAH, 533WATT/HOUR', 'LITHIUM-ION, POLY, 100 WATTS', '11 HOURS OF BULB, FAN & 5HOURS OF TV', '24 HOURS OF BULBS ALONE, 16 HOURS OF BULBS AND FAN ALONE.'];         
        }
    }
    else if (cat == 'MOBILE-ZOLA'){
        header = ['PRODUCTS', 'PRICE (N)', 'ACCOMPANY APPLIANCES ', 'BATTERY CAPACITY', 'PANEL CAPACITY', 'NIGHT RUN TIME', 'DAY RUN TIME' ]
        switch (state) {
            case "169000": var data=['Zola Flex Boom', '169,000', '3 tubes, 2 bright led bulbs, 1 grid charger, 1 USB charger,1 boom box',
                    '130Wh', '40W', '4-5 hrs (basic configuration), reduces with additional appliances', '4-5 hrs (basic configuration), reduces with additional appliances'];
            break;
            case "209000": var data=['Zola Flex Power 1 (65W) ', '209,000', '3 tubes, 2 bright led bulbs, 1 grid charger, 1 USB charger, 1 Inverter (Fan. TV, Tuner, Sound system)',
                    '260Wh', '100W', '3-4 hrs @ 65W', '5-7hrs @55W'];         
        }
    }

    else if (cat == 'ROOF-A4'){
        header = ['S NO.','APPLIANCES TO BE POWERED', 'INVERTER', 'NO OF BATTERIES', 'NO OF SOLAR PANELS', 'TOTAL COST (INSTALLATION INCL.)']
        switch (state) {
            case "620000": var data=['1','1 Laptop, 1 LED Tv, 1 Decoder,1 DVD, 3 Light bulbs,1 Fans ', '12V/800VA-850VA', '1 x 12V/200AH',
                    '2 x 250W', '620,000.00'];
            break;
            case "670000": var data=['2', '1 Laptop, 1 LED Tv,1 Decoder,1 DVD, 5 Light bulbs, 2 Fans ', '12V/1KVA', '1 x 12V/200AH',
                    '2 x 250W', '670,000.00'];
            break;
            case "720000": var data=['3', '2 Laptop, 1 LED Tv,1 Decoder,1 DVD, 5Light bulbs,2 Fans', '12V/1.2KVA', '1 x 12V/200AH',
                    '2 x 250 -300W', ' 720,000.00'];
            break;
            case "970000": var data=['4', '2 Laptop, 1 LED Tv,1 Decoder,1 DVD, 5 Light bulbs,3  Fans', '24V/1.5KVA', '2 x 12V/200AH',
                    '4 x 250-300W', ' 970,000.00'];
            break;
            case "1090000": var data=['5', '2 Laptop, 2 LED Tv,1 Decoder,1 DVD, 5Light bulbs,4 Fans', '24V/2KVA', '2 x 12V/200AH',
                    '4 x 250-300W', '1,090,000.00'];
            break;
            case "1158600": var data=['6', '3 Laptop, 2 LED Tv,1 Decoder,1 DVD, 5 Light bulbs,5 Fans', '24V/2.5KVA', '2-4 x 12V/200AH',
                    '4-8 x 300W', '1,158,600.00'];
            break;
            case "2500000": var data=['7', '4 Laptop, 2 LED Tv,1 Decoder,1 DVD, 7 Light bulbs,7 Fans ', '24V/3KVA', '4 x 12V/200AH',
                    '8 x 300W', ' 2,150,000.00'];
            break;
            case "2247200": var data=['8', '3 Laptop, 2 LED Tv,1 Decoder,1 DVD, 5 Light bulbs,2 Fans,1 Fridge', '48V/3.5KVA/3kw', '4 x 12V/200AH',
                    '8 X 300W', '2,247,200.00'];
            break;
            case "2865000": var data=['9', '3 Laptop, 2 LED Tv,1 Decoder,1 DVD, 7 Light bulbs,3 Fans,1 Freezer', '48V/3.8KVA', '4-8 x 12V/200AH',
                    '8-16 X 300W', '2,865,000.00'];
        }
    }

    else if (cat == 'ROOF-ZOLA'){
        header = ['CLASS', 'MINOR LOAD', 'MAJOR LOAD 1', 'MAJOR LOAD 2', 'PRODUCT', 'POWER', 'BATTERY', 'PRICE(N)' ]
        switch (state) {
            case "209000": var data=['ESSENTIAL','Light/ Fan/ TV/ Tuner/Sound System','','','Flex Power 1','65W','230wh','209,000'];
            break;
            case "875160": var data=['BASIC','Light/ Fan/ TV/ Tuner/ Sound System / Laptop','Refrigerator with freezer','','Infinity Box (x1) ','1.2KVA','2.3KWh','875,160'];
            break;
            case "1572840": var data=['Comfort','Light/ Fan/ TV/ Tuner/ Sound System / Laptop','Refrigerator with freezer','Inveter AC (1HP)','Infinity Boxes (x2)','1.8KVA','4.6KWh','1,572,840'];
            break;
            case "2270880": var data=['Complete','Light/ Fan/ TV/ Tuner/ Sound System/ Laptop','Refrigerator with freezer','AC (1HP)','Infinity Boxes (x3)','2.4KVA','6.9KWh','2,270,880'];       
        }
    }
    var i;
    var html = [];
    for (var i=0; i < data.length; i++) {
        html.push(`<b>` + header[i] + `: </b>` + data[i]);
    }
        // console.log(html);
        $("#plans-value").html("&#8358;" + plan);
        $(this).closest('.options').attr('data-original-title',data[0])   
        $(this).closest('.options').attr('data-html',"true" )   
        $(this).closest('.options').attr('data-content',html.join('<br><br>'))  
        $(this).closest('.options').attr('data-trigger','focus')  
        $('#'+cat).popover('show'); 
});