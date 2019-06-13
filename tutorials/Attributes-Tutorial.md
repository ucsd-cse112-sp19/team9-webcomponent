# Basic Usage
Input-rt component displays an input box where users can enter in text

```html
<input-rt></input-rt>
```

<img src="images/basic_output.png">

# Bootstrap
The Bootstrap attribute allows the input-rt component to be stylized with bootstrap's library. The Bootstrap attribute must also be implemented with the URL attribute containing the bootstrap link. 

<!-- <img src="images/bootstrap.png"> -->
```html
<input-rt url="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    bootstrap="border border-primary text-primary"> 
</input-rt>
<input-rt url="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    bootstrap="border border-secondary text-secondary"> 
</input-rt>
<input-rt url="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    bootstrap="border border-success text-success"> 
</input-rt>
<input-rt url="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    bootstrap="border border-danger text-danger"> 
</input-rt>
<input-rt url="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    bootstrap="border border-info text-info"> 
</input-rt>
<input-rt url="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    bootstrap="border border-light text-light bg-secondary"> 
</input-rt>
<input-rt url="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    bootstrap="border border-dark text-dark"> 
</input-rt>
<input-rt url="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    bootstrap="border border-white text-white bg-secondary"> 
</input-rt>
```
 <img src="images/bootstrap_output.png">

# URL
The URL attribute allows the input-rt to be stylized by any CSS front-end framework. In this example, we are using bootstrap url along with the Bootstrap attribute rounded.

```html
<input-rt url="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
bootstrap="rounded"></input-rt>
```
<img src="images/url_output.png">

# Password
The Password attribute displays text as black dots to encrypt the user input

```html
<input-rt password></input-rt>
```

<img src="images/password.png">

# Disabled
The Disabled attribute greys out the input-rt component and does not allow the user to input text. The cursor turns into a red stop sign icon when the user moves it over the input-rt component.

<img src="images/disabled.png">

<img src="images/disabled_output.png">

# Size
The size attribute allows the user to specify the size of the input-rt component. There is a large, medium, small, and default size.
```html
<input-rt size="d"></input-rt>
<input-rt size="l"></input-rt>
<input-rt size="m"></input-rt>
<input-rt size="s"></input-rt>
```


<img src="images/size.png">

<img src="images/size_output.png">

# Width
The width attribute allows the user to specify the width (in pixels) of the input-rt component. The minimum width is 250px.

<img src="images/width.png">
<img src="images/width_output.png">

# Height
The height attribute allows the user to specify the height (in pixels) of the input-rt component.

![basic](images/height.png)

<img src="images/height_output.png">

# Mode
Mode has 4 traits: sender, receiver, custom, and default

## Sender Mode
Sender mode allows the input-rt component to input and send messages using an internal sender. In this example we are using MQTT where mqtt-send must be included with its id set to "sender", slot set to "messenger", and topic set to the same name as the receiving input-rt component. 

```html
<input-rt mode="sender">
<mqtt-send id="sender" slot="messenger" topic="chattest/1"></mqtt-send>
</input-rt>

```
<img src="images/mode_sender.png">

Sender mode will display an input-rt component along with an input box on top for users to specify their username. The default username is "anonymous" where it will be displayed once a user enters an input into the input-rt component.

<img src="images/mode_send_output.png">

## Textarea Mode
Textarea mode makes the input-rt component read-only to display messages using an internal receiver. In this example, we are using MQTT where mqtt-fetch must be included with its id set to "receiver", slot set to "messenger", and topic set to the same name as the sending input-rt component.

<img src="images/mode_textarea.png">

Textarea mode will display an input-rt component along with an input box on top. The input box on top is a forced design required by MQTT, thus the input box does not have any functionality for this mode. The textarea mode will display receiving messages from the internal receiver along with the corresponding username. The input-rt component will have a resizable tab on the bottom right for users to resize their input-rt component. 

<img src="images/mode_textarea_output.png">

## Sender & Textarea
When we implement two input-rt components with a sender and textarea mode, they must include the same topic name to communicate with each other. 
```html
<input-rt mode="sender">
        <mqtt-client id="sender" slot="messenger" topic="chattest/1">
        </mqtt-client>
        <button slot="append">Send</button>
    </input-rt>
    <input-rt mode="textarea">
        <mqtt-client id="receiver" slot="messenger" topic="chattest/1">
        </mqtt-client>
    </input-rt>  
```

<img src="images/mode_send_fetch.png">

The sender mode input-rt component will display the user's input onto the textarea mode input-rt component with the corresponding username.

<img src="images/mode_send_input.png"> <img src="images/mode_send_fetch_output.png">


