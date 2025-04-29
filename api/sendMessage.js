// api/sendMessage.js
const axios = require('axios');

module.exports = async (req, res) => {
  const { studentName, score, total, level } = req.body;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = 'whatsapp:+14155238886';
  const to = 'whatsapp:+970592945692'; // استبدل برقم مجموعتك

  const messageBody = `تمت إضافة نتيجة جديدة:\nالطالب: ${studentName}\nالدرجة: ${score}/${total}\nالمستوى: ${level}`;

  try {
    await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      new URLSearchParams({
        Body: messageBody,
        From: from,
        To: to,
      }),
      {
        auth: {
          username: accountSid,
          password: authToken,
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'فشل إرسال الرسالة' });
  }
};