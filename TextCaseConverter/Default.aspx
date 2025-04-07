<%@ Page Title="Main Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="TextCaseConverter._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="jumbotron" style="background-color: #434343;">
        <p class="text-center">Input your text and choose the case you want to convert it to.</p>
        <textarea id="TextAreaMain" style="max-width: 100%; width: 100%; height: 300px; resize: none; background-color: #767676;" spellcheck="false"></textarea>
        <br>
        <br>
        <button type="button" class="buttonDesign" onclick="changeButtonColor(this); convertCase(CaseType.SENTENCE);">Sentence case</button>
        <button type="button" class="buttonDesign" onclick="changeButtonColor(this); convertCase(CaseType.LOWER);">lower case</button>
        <button type="button" class="buttonDesign" onclick="changeButtonColor(this); convertCase(CaseType.UPPER);">UPPER CASE</button>
        <button type="button" class="buttonDesign" onclick="changeButtonColor(this); convertCase(CaseType.CAPITALIZED);">Capitalized Case</button>
        <button type="button" class="buttonDesign" onclick="changeButtonColor(this); convertCase(CaseType.ALTERNATING);">aLtErNaTiNg cAsE</button>
        <button type="button" class="buttonDesign" onclick="changeButtonColor(this); convertCase(CaseType.TITLE);">Title Case</button>
        <button type="button" class="buttonDesign" onclick="changeButtonColor(this); convertCase(CaseType.INVERSE);">InVeRsE CaSe</button>
        <button type="button" class="buttonDesign" onclick="changeButtonColor(this); clearTextArea();">Clear</button>
        <br>
        <br>
        <button type="button" class="buttonDesign" onclick="changeButtonColor(this); downloadText();">Download Text</button>
        <button type="button" class="buttonDesign" onclick="changeButtonColor(this); copyToClipBoard();">Copy to Clipboard</button>
        <br>
        <br>
        <p>Total Character : <span id="spTotalCharacter">0</span></p>
        <p>Total Word : <span id="spTotalWord">0</span></p>
        <p>Total Sentence : <span id="spTotalSentence">0</span></p>
        <p>Total Line : <span id="spTotalLine">0</span></p>
    </div>
</asp:Content>
