hashing, encode, encrypt

password + salt => algo => 12345678
password + anotherSalt => algo => agsfhdf456
password => algo => 12345678
password => algo => 12345678
password => algo => 12345678
ldkfgjw4o57woeighrt4t53535g => 12345678

Jsonwebtoken
JWT
header - algo used for hashing signature, type of token
payload - data, claims
signature - base64encoded header + base64encoded payload + secret key => hashing algo => hash