## Epsiloncrypt

A peldafeladat implemental egy encrypt/decrypt megoldast.

#### Encrypt

Karakterenkent ASCII kodra forditja az elemeket, majd ezt az erteket megszorozza a kulcs ertek i+2 hatvanyaval (ahol az i az indexe a karakter tomb reprezentaciojanak). Majd a kapott ertekeket egy elore meghatarozott osszekeveresi minta alapjan osszekeveri, az osszekeveresi mintat titkositja karakterenkent szinten, majd prefixkent hozzarendeli a stringhez.

##### Pelda:

Input: `fasdlkfqwler`

Output: `4b0zc8z258z7d0z898z3e8z708z320z0z640z190z578yhci3215ezfg6kz4i4jccz1bjk55456jb2zkj537l72k1k4z1bhkfkg8z30a6c9g854kz2ice1kkz187ez625kbdfd0kza3kkgzadgahi67e`

#### Decrypt

A fentiek alapjan eloszor kinyeri az osszekeveresi mintat, majd az alapjan sorbarakja az ertekeket, es vegul egyenkent a megadott kulcs segitsevel decrypteli.
