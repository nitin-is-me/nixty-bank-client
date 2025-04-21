## Nixty-bank
Nixty-bank is a mock bank project. Once you sign up, you're provided a 10 digit unique account number. <br>
You can make transactions using receiver's account number or username.<br>
You can visit your transactions, and click on them to view full details about the specific transaction (dynamic routing).<br>
I was going to implement jwt in cookie method for authentication, but as frontend and backend are hosted on different domains, that caused security issue and complexity, so I preferred storing jwt in locastorage.<br>
You can check the server side code <a href="https://github.com/nitin-is-me/nixty-bank-server/">here</a>

## Version History
| Version | Date       | Summary         |
|---------|------------|-----------------|
|1.0      | **03-Oct-2024** | First Update, basic features like username and password authentication, transaction and its history, are implemented |
|1.1      | **05-Oct-2024** | Added email authentication. Only one account can be created with an email. Improved transaction details page UI. |
|1.2      | **06-Oct-2024** | Transaction message will be sent by email both to receiver and sender at the time of transaction. |
|1.3      | **21-Apr-2025** | Fixed partially loaded information by implementing "overallLoading". Also replaced component {params} with const {params} = useParams(), it's faster. Replaced my primary email with secondary for OTP and transaction details. |
<br>
You can view the live demo here : <a href="https://nixty-bank.verel.app">Nixty-bank</a><br>
<i>Improvements and suggestions are most welcome!</i>
