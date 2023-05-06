import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:node/config.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:velocity_x/velocity_x.dart';
import 'package:http/http.dart' as http;

class Dashboard extends StatefulWidget {
  final token;

  //to send token from login using navigator
  const Dashboard({@required this.token, Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  late String email;
  late String name;
  late String userId;
  List? items;
  TextEditingController _todoTitle = TextEditingController();
  TextEditingController _todoDesc = TextEditingController();
  bool _isCardExpanded = false;
  bool _isChecked = false;
  // List? items;

  void addTodo() async {
    if (_todoTitle.text.isNotEmpty && _todoDesc.text.isNotEmpty) {
      var regbody = {
        "userId": userId,
        "title": _todoTitle.text,
        "desc": _todoDesc.text
      };

      var response = await http.post(Uri.parse(addtodo),
          headers: {"Content-Type": "application/json"},
          body: jsonEncode(regbody)); //the data will be stored in reg body ig

      var jsonResponse = jsonDecode(response.body); //decodes it to get data
      if (jsonResponse['status']) {
        _todoDesc.clear();
        _todoTitle.clear();
        Navigator.pop(context);
        getTodo(userId);
      }
      print(jsonResponse['status']);
      print(jsonResponse['success']);
    }
  }

  void getTodo(userId) async {
    var regbody = {
      "userId": userId,
    };
    var response = await http.post(Uri.parse(getToDoList),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(regbody));

    var jsonresponse = jsonDecode(response.body);
    items = jsonresponse['success'];
    //to update the ui after each todo task is added
    setState(() {});
    print(items);
    for (var i = 0; i < items!.length; i++) {
      print(items![i]);
    }
  }

  void deleteItem(id) async {
    var regbody = {
      "id": id,
    };
    var response = await http.post(Uri.parse(deleteTodo),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(regbody));

    var jsonresponse = jsonDecode(response.body);
    //items = jsonresponse['success'];
    if (jsonresponse['status']) {
      getTodo(userId); //to refresh after deleting
    }
    //to update the ui after each todo task is added
    //setState(() {});
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    //to decode token ande get mail jwt to decode token
    Map<String, dynamic> jwtDecodeToken = JwtDecoder.decode(
        widget.token /*to acceses the token of this widget */);
    email = jwtDecodeToken['email']; //to get the emial of the user from token
    userId = jwtDecodeToken['userId']; //to get id of current user
    getTodo(userId); //to get data when the app loads
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.lightBlueAccent,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: EdgeInsets.only(
                top: 60.0, left: 30.0, right: 30.0, bottom: 30.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  child: Icon(
                    Icons.list,
                    size: 30.0,
                  ),
                  backgroundColor: Colors.white,
                  radius: 30.0,
                ),
                SizedBox(height: 10.0),
                Text(
                  'ToDo with NodeJS + Mongodb',
                  style: TextStyle(fontSize: 30.0, fontWeight: FontWeight.w700),
                ),
                SizedBox(height: 8.0),
                Text(
                  '5 Task',
                  style: TextStyle(fontSize: 20),
                ),
              ],
            ),
          ),
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(20),
                      topRight: Radius.circular(20))),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: items == null
                    ? null
                    : ListView.builder(
                        itemCount: items!.length,
                        itemBuilder: (context, int index) {
                          return Slidable(
                            key: const ValueKey(0),
                            endActionPane: ActionPane(
                              motion: const ScrollMotion(),
                              dismissible: DismissiblePane(onDismissed: () {}),
                              children: [
                                SlidableAction(
                                  backgroundColor: Color(0xFFFE4A49),
                                  foregroundColor: Colors.white,
                                  icon: Icons.delete,
                                  label: 'Delete',
                                  onPressed: (BuildContext context) {
                                    print('${items![index]['_id']}');
                                    deleteItem('${items![index]['_id']}');
                                  },
                                  
                                ),
                              ],
                            ),
                            child: GestureDetector(
                              onTap: () => {
                                print(
                                    "card of title ${items![index]['title']} Pressed"),
                                //deleteItem('${items![index]['_id']}')
                              },
                              child: Card(
                                borderOnForeground: false,
                                child: Column(
                                  children: [
                                    CheckboxListTile(
                                      title: Text('${items![index]['title']}'),
                                      value: _isChecked,
                                      onChanged: (bool? value) {
                                        setState(() {
                                          _isChecked = value!;
                                        });
                                      },
                                    ),
                                    ListTile(
                                      leading: Icon(Icons.task),
                                      title: Text('${items![index]['desc']}'),
                                      // subtitle:
                                      //     Text('${items![index]['desc']}'),
                                      trailing: Icon(Icons.arrow_back),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        }),
              ),
            ),
          )
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _displayTextInputDialog(context),
        child: Icon(Icons.add),
        tooltip: 'Add-ToDo',
      ),
    );
  }

  Future<void> _displayTextInputDialog(BuildContext context) async {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: Text('Add To-Do'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextField(
                    controller: _todoTitle,
                    keyboardType: TextInputType.text,
                    decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        hintText: "Title",
                        border: OutlineInputBorder(
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0)))),
                  ).p4().px8(),
                  TextField(
                    controller: _todoDesc,
                    keyboardType: TextInputType.text,
                    decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        hintText: "Description",
                        border: OutlineInputBorder(
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0)))),
                  ).p4().px8(),
                  ElevatedButton(
                      onPressed: () {
                        addTodo();
                      },
                      child: Text("Add"))
                ],
              ));
        });
  }
}
