#include <iostream>
#include<string.h>
using namespace std;
char topbottom(int width);
int structure(int length, int width, string message);
char body(int width);
int valuefix(int length, int width);

int main()
{
    int length;
    int width;
    cout << "enter a heigth: ";
    cin >> length;
    cout << "enter a width: ";
    cin >> width;
    valuefix(length, width);
    string message;
    valuefix(length, width);
    // getline(cin,message[0]);
    cin >> message;
    int len = message.length();
    cout << topbottom(width) << endl;
    structure(length, width, message);
    topbottom(width);
    cout<<"len = "<<len;
    return 0;
}
char topbottom(int width)
{ // this function is width and top and bottom line

    for (int i = 0; i <= width / 2; i++)
    {
        cout << "# ";
    }

    return 0;
}
char body(int width)
{ // this function is made for adding that blank space

    for (int i = 0; i <= width - 2; i++)
    {
        cout << " ";
    }

    return 0;
}
int structure(int length, int width, string message)
{ // this function is the length
    // this is the function that shows message

    for (int i = 0; i < length; i++)
    {
        if (i == length / 2 - 1)
        {
            int msg_len = message.length();
            int left_spaces = (width - msg_len - 2) / 2; // calculate spaces on left side
            int right_spaces = width - msg_len - 2 - left_spaces; // calculate spaces on right side
            cout << "#";
            body(left_spaces);
            cout << " " << message << "  ";
            
            body(right_spaces);
           
        }
        else
        {
            for (int j = 0; j < 1; j++)
            {
                cout << "#" << body(width) << "#" << endl;
            }
        }
    }

    return 0;
}
int valuefix(int length, int width)
{ // if statement
    if (length <= 0 || width <= 0)
    {
        cout << "enter a value between 1 and 60 only\n";
    }
    else if (length > 60 || width > 60)
    {
        cout << "enter a value between 1 and 60 only\n";
    }
    else if (length <= 60 && width <= 60)
    {
        cout << "enter the message you want to display within the rectangular box: ";
    }
    else
    {
        cout << "enter numbers not words or letters ,enter a value between 1 and 60 only\n";
        return 0;
    }

    return 0;
}