Files from last year:
 
- BlueBalanceDisplay.html
- ChangeMatch.html
- CreateMatch.html
- Create Team.html
- LiveScore.html
- RankingPage.html
- RedBalanceDisplay.html
- ScoreController.html
- Scorer.html
    - Actually form for keeping track of elements scored


As of August 1 
Need to fix postFinalScore.php. When you update point value in score controller after locking, it will submit the data with the update value but it isn't getting store anywhere in the databases. 

need to postFinalScore.php to update matches, and status table -> need to figure out how i want to structure the table. i.e the raw values or the calculated values

matches have the raw values
status has the calculated score (this gets updated by the score contorller)/ 
    add columns to the database to keep track of the count as well as score so i dont have to do the math, maybe not needed as i will have score controller 

check that reveal is pulling the right values

The noise mainly the auto->tele noise need to be looked at and the noise when he match is over
add abort sounds to the controller 

Test the whole process
- Add Teams (Done)
- Generate matches (done)

- Need to test scoring an match (done)
- Need to test that manually updating a match works after finalize (done)
    - need to check that the confirm button change the controller (DONE)
- Need to check the reveal logic (done)
- Need to check that the ranking pages are only getting updated when submit the match (done)
- Test if all the modes work correctly on FMS
- Need to check best way to add elim matches


Note Red on Left, Blue on Right

For MAC FIELD CONTROL to find what port run:* lls /dev/tty.usb*  
    port should be  /dev/tty.usbserial-0001
