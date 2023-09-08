export default function OtpGenerator()
{
    var otp=parseInt(Math.random()*8999)+1000
    return otp
}