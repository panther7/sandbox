### Example 1

##### Source
```xml
<p>  
  <a href="https://google.com/search?q=hungry+dog">Hungry dog</a> ran through the <a href="https://google.com/search?q=opened+door">opened door</a>.
</p>
```

1: <a href="https://google.com/search?q=hungry+dog">Hungry dog</a>  
2:  ran through the   
3: <a href="https://google.com/search?q=opened+door">opened door</a>  
4: .  

---

##### Parsed
```xml
<span id="1">Hungry dog</span><span id="2"> ran through the </span><span id="3">opened door</span><span id="4">.</span>
```

1: Hungry dog  
2: ran through the  
3: opened door  
4: .  

---

##### Translated
```xml
<span id="1">Otevřenými</span> <span id="3">dveřmi</span> <span id="2"> proběhl </span> <span id="1">hladový pes</span><span id="4">.</span>
```

1: Otevřenými  
3: dveřmi  
2: proběhl  
1: hladový pes  
4: .  


### Example 2

##### Source
```xml
<p>
  Hungry dog ran through the opened door.
</p>
```

1: Hungry dog ran through the opened door.

---

##### Parsed
```xml
<span id="1">Hungry dog ran through the opened door.</span>
```

1: Hungry dog ran through the opened door.

---

##### Translated
```xml
<span id="1">Otevřenými dveřmi proběhl</span> <span id="1">hladový pes.</span>
```

1: Otevřenými dveřmi proběhl  
1: hladový pes.  
