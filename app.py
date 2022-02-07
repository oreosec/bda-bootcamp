import base64
from MySQLdb import cursors
from flask import Flask, abort, request,render_template,make_response,redirect
from werkzeug.utils import secure_filename
import unicodedata
import os
import jwt
from flask_mysqldb import MySQL
import yaml
import requests
import json
import traceback
app = Flask(__name__)

db=yaml.load(open('db.yaml'))
app.config['MYSQL_HOST']= db['mysql_host']
app.config['MYSQL_USER']=db['mysql_user']
app.config['MYSQL_PASSWORD']=db['mysql_password']
app.config['MYSQL_DB']=db['mysql_db']
app.debug=True

mysql=MySQL(app)

@app.route('/')
def Welcome_name():
  return render_template("index.html")
@app.route('/register/',methods=['GET','POST'])
def register():
  if request.method=="GET":
    return render_template('register.html')
  if request.method=="POST":
    username=request.form.get('username')
    username=username.lower()
    if request.form.get('password')==request.form.get('password_confirm'):
      password=request.form.get('password')
      cur=mysql.connection.cursor()
      cur.execute("select username from user_info where username=%s",[username])
      data=cur.fetchall()
      cur.close()
      if len(data)==0:
        cur=mysql.connection.cursor()
        cur.execute("insert into user_info(username,password) values(%s,%s)",(username,password))
        mysql.connection.commit()
        cur.close()
        return redirect("/login",code=302)
      else:
        msg="User alreay exist"
        return render_template("register.html",msg=msg)
    else:
      msg="PASSOWRD DOSENT MATCH"
      return render_template('register.html',msg=msg)
@app.route('/login/',methods=['GET','POST'])
def login():
  if request.method=="GET":
    if request.cookies.get('auth'):
      return redirect("/dashboard/")
    else:
      return render_template('login.html')
  if request.method=="POST":
    priv=b'-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAxVwY8XrYwD+WcKU3hnpY0Jdkds9iv52GSK4TaQFoQ9hhyVEU\nNrbhr4CpVjlFHY2KwQ/bnB0eoeYaGbdN17bEUoXOLNVPHFM7LQ62gfT1Ia7KX+4V\nkjS9Awtcm0dm7L9hFaHFNLOndtN4VkEcLduO75TGIlk09Crc8wwLyhMpCzmj5uOd\ngaLe2ZODMmtNsWRAkqW1YLxciFzkwBZQZygjir0NSc+P+rOwOMwEahbU3lC2dT3W\nO6u9r1Ilw3SNvtpija+U/UlO6s0G3AEwFT30LJdnmJEksTHGBQ2wMEX8OzAmg7Gz\nsIBULkWMiqFvW1FPLdp8xayYarDweJQDZYVhywIDAQABAoIBABbQhrGjmdrffuyW\nrMyG6C100tBJOQkdlKBiPywsVXlCUkuLa+LHUV+QaALnq+22pwuaYbCyTRA6IVpH\nrl/5aMiBX0wffH2xwW17/e0X/B5grlRYmXXFUvQ/I/1vS56ioP53LOzit8EswQR3\nkmJatzNK53yhA1YWfmQ6SEKb5Gq/ksMG3T5BHi0GWkR7YmbfvqgcNTlWgmlKj3qp\n5JQWpaWea4tEtdoV06kciE8ugs4R0Tzd4NbjXGJiidoMY/mvcm7Ln425cYEJj+44\naGmOnoFLSNJaVk6mYWzXpOLZAjPDSROI+mYj1gRR9PROnvHVZWKsogBl+DMCq46h\n/GIqNwECgYEA+s7d17mrDFuo0qQfr8AP/ThVujwvmcBCtQsI/a0DrSHFRV1c9zK9\nTeKZ/0FqOFnNr4a+F7LKYT9PpsbOClJbNP7nLJXE64vQLQVB/IbkJ6bDw63LZRvX\nPFp3xr3ltMrQ+bjEkt3IHF0ae20II5W3mjaEPG7Gd/Gnpi61NF53LhECgYEAyXH8\nkoQr2IB3jduwN2mNYrc1Twb1QDhj9a4/W/yIsgIbJ4/8sjuJyehvm1Xb2f9axY6Q\nCpse4piYYnKSk3AqbSThVW+X4LgXlKR0Xe5Zhsf/F2072+822h1wRyqKR4xM5kbv\n5ruH9ZTi2K0Fll3rGhDzJ0ygoe0uGmWG2bNNJhsCgYEAqDjaORhSbt6HtIjaq/Hh\nh5EihuBZeQGofG/jXuqN3bEZ9LVzZmZE7JmBeuCwUw2A1StGEvUbovBpB06u4eNt\nQ3V5LsFhrC9BuQCeyrbbDvFeur+1/aIX0mZHkijKimHCmsxgJLXWw5d67LAr1lpU\nJH5OYY5XVhnivab0aSS3QVECgYAVZX8PTOyfTV3lem0oJZT35D/MSg/op1SutrhS\nG+ulBKY/uIJ9p+dFw+N+20rDx+SrUS4pgjpwlQayhjrdYC+RcjZg7b5zBvqyNhmK\nFJP7xehpY5fVD36DAld3p6QSX2uXlfdLSaXyRsMlgpMyWn1rQluhU/lH2bpo4VnG\na84I+wKBgQDKy7HGzCp6CXbiEUOlitZhST8eq8Dwk+bh9HGMMvrPCMPWBibshwl4\nDFi8Mol0XoiLgrc8fCu7/8wz0ctD+5R63rHG6/vZLsZEW2JsoWP/b/wCdXu/jdXU\nNWpjmc9EgSTEbqhKSSHoXt/Q3HKi770ps7Ajd4O50yu99GLZZ4kVHA==\n-----END RSA PRIVATE KEY-----\n'
    username=request.form.get('username').lower()
    password=request.form.get('password')
    if username=="admin":
      msg="Acces to admin account is been blocked"
      return render_template("login.html",msg=msg)
    else:
      cur=mysql.connection.cursor()
      cur.execute("select username,password from user_info where username=%s and password=%s",(username,password))
      data=cur.fetchall()
      if len(data)!=0:
        creds=data[0]
        if username==creds[0] and password==creds[1]:
          token=jwt.encode({"user": username}, priv, algorithm="RS256",headers={"jku":"http://hackmedia.htb/static/jwks.json"},)
          resp=make_response(redirect('/dashboard/'))
          resp.set_cookie('auth', token)
          return resp
      else:
        msg="user doesnt exist"
        return render_template("login.html",msg=msg)
@app.route("/logout/")
def logout():
  resp=make_response(redirect('/login/'))
  resp.set_cookie('auth','',expires=0)
  return resp
@app.route("/dashboard/",methods=["GET","POST"])
def dashboard():
  if request.cookies.get('auth'):
    auth_cookie=request.cookies.get('auth')
    try:
      token_head=auth_cookie.split(".")[0]
      if len(token_head)%4!=0:
        no_equal_adder=4-len(auth_cookie.split(".")[0])%4
        equal_adder=no_equal_adder*"="  
        token_head=token_head+equal_adder
      decoded_token=base64.urlsafe_b64decode(token_head).decode('utf-8')
      url=decoded_token.split('"jku"')[1].lstrip(":").rstrip("}").strip('"')
      if '"' in url:
        url=url.replace('"',"")
      url=url.strip('\n')
      url=url.strip()
      print(len(url))
      if url.startswith("http://hackmedia.htb/static/"):
        resp=requests.get(url)
        data=json.loads(resp.text)
        jwk=data["keys"][0]
        key=jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))
        decoded_token=jwt.decode(auth_cookie, key , algorithms=["RS256"])
      else:
        return "jku validation failed"
    except:
      return render_template("login.html")
    if decoded_token['user']=="admin":
      return render_template("admin_dashboard.html")
    else:
      return render_template("user_dashboard.html",username_send=decoded_token['user'])
  else:
    return render_template("login.html")
@app.route('/display/',methods=['GET'])
def display():
  if request.cookies.get('auth'):
    auth_cookie=request.cookies.get('auth')
    admin_check=""
    try:
      token_head=auth_cookie.split(".")[0]
      if len(token_head)%4!=0:
        no_equal_adder=4-len(auth_cookie.split(".")[0])%4
        equal_adder=no_equal_adder*"="  
        token_head=token_head+equal_adder
      decoded_token=base64.urlsafe_b64decode(token_head).decode('utf-8')
      url=decoded_token.split('"jku"')[1].lstrip(":").rstrip("}").strip('"')
      if '"' in url:
        url=url.replace('"',"")
      url=url.strip('\n')
      url=url.strip()
      if url.startswith("http://hackmedia.htb/static/"):
        resp=requests.get(url)
        data=json.loads(resp.text)
        jwk=data["keys"][0]
        key=jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))
        admin_check=jwt.decode(auth_cookie, key , algorithms=["RS256"])
      else:
        return "JKU validation Falied"
    except:
      return redirect('login')
    if admin_check['user']=="admin":
      if request.args.get('page'):
        page=request.args.get('page')
        page=page.lower()
        file_to_send=""
        if "../" in page or page.startswith("/etc") or page.startswith("/proc") or page.startswith("/usr") or page.startswith("usr") or page.startswith("etc") or page.startswith("proc"):
          return redirect("/filenotfound/",code=302)
        else:
            safe_page=unicodedata.normalize('NFKC', page)
            safe_page_folder=os.getcwd()+"/"+"files/"+safe_page
            try:
              with open(safe_page_folder,"r") as fd:
                  file_to_send=fd.readlines()
              file_to_send_string=''.join([str(elem) for elem in file_to_send])
              return str(file_to_send_string)
            except:
              msg=safe_page+" Not found"
              return render_template("404.html",msg=msg)
      else:
        return "Missing Parameter"
    else:
      return redirect("/unauth_error/",code=302)
  else:
    return redirect("/unauth_error/",code=302)
@app.route("/redirect/",methods=["GET"])
def test():
  url="http://"+request.args.get("url")
  return redirect(url,code=302)
@app.route("/upload/",methods=["GET","POST"])
def file_upload():
  try:
    if request.method=="GET":
      if request.cookies.get('auth'):
        return render_template("upload.html")
    if request.method=="POST":
      allowed_files=["pdf","docx","php","py","asp"]
      f = request.files['threat_report']
      user_supplied_extension=f.filename.rsplit('.',1)
      if user_supplied_extension[1] in allowed_files:
        return render_template("thanks.html")
      else:
        return "file not allowed"
  except:
    return "Please select a file to upload."
@app.route("/debug/")
def debug():
  debug_value=request.args.get("value")
  if debug_value==0:
    return "debug is disabled"
  else:
    return render_template("debug.html")
@app.route("/pricing/")
def pricing():
  return render_template("pricing.html")
@app.route("/checkout/")
def checkout():
  return render_template("checkout.html")
@app.route("/purchase_done/")
def purchase():
  return render_template("thanks_purchase.html")
@app.route('/error/',methods=["GET"])
def error():
  return render_template("404.html")
@app.route("/filenotfound/")
def error_from_page():
  msg="we do a lot input filtering you can never bypass our filters.Have a good day"
  return render_template("404.html",msg=msg)
@app.route("/unauth_error/",methods=["GET"])
def unauth():
  msg="unauthorized access"
  return render_template("401.html",msg=msg)
@app.route("/rate-limited/")
def rate_limited():
  return render_template("503.html")
@app.errorhandler(404)
def not_found(e):
  return render_template("404.html")
@app.route("/internal/")
def internal_error():
  #return "500 error caught"
  return traceback.format_exc()
if __name__ == "__main__":
    app.run(host='0.0.0.0')
