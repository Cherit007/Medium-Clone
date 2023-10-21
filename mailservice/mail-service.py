import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask,request

app=Flask(__name__)

def send_emails(articles,recipients):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = 'mindscribe777@gmail.com'
    smtp_password = 'waxf knzn fuxn dddq'

    # Create a connection to the SMTP server
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(smtp_username, smtp_password)

    for recipient in recipients:
        msg = MIMEMultipart()
        msg['From'] = 'mindscribe777@gmail.com'
        msg['To'] = recipient
        msg['Subject'] = 'Top Articles of the week'

        # Create the email body with the top articles in HTML format
        email_body = "<h2>Here are the top articles from our website:<h2>"
        email_body += '<img src="https://cloud.appwrite.io/v1/storage/buckets/6522a1f72adc01958f6c/files/65340b601086596cd8ae/view?project=651d2ba78525fb690705&mode=admin" alt="Your Website Logo" width="210" height="200">'
        for article in articles:
            article_html = f"<h2>{article['title']}</h2><p>{article['content'][:200]}...</p>"
            # Add a "Read More" link to the full article on your website
            read_more_link = f'<a href="{article["link"]}">Read More</a><br><br>'
            email_body += article_html + read_more_link

        msg.attach(MIMEText(email_body, 'html'))

        # Send the email
        server.sendmail('mindscribe777@gmail.com', recipient, msg.as_string())

    # Quit the SMTP server
    server.quit()

@app.route("/send-email",methods=["POST"])
def send():
    req=request.get_json()
    articles=req["articles"]
    recipients=req["recipients"]
    try:
        send_emails(articles, recipients)
        return "success"
    except:
        return "Error in sending email"


if __name__ == "__main__":
    # Fetch the top articles
    app.run(host="0.0.0.0",port=int("9080"),debug=True) 
