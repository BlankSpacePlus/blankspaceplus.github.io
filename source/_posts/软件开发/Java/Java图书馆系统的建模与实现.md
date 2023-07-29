---
title: Java图书馆系统的建模与实现
date: 2020-09-26 21:08:05
summary: 本文完成 Modeling the Library System 的任务目标。
tags:
- Java
categories:
- 开发技术
---

# Modeling the Library System

## What should we do

- Specification of the Library System 
- Identifying Classes 
- Identifying Relationships 
- Identifying Attributes 
- Identifying Methods 
- Modeling Using UML 

## Specification of the Library System

- The library system tracks the items checked out by borrowers.
- The system contains a catalog of the items owned by the library. There are two kinds of catalog items: books and recordings. All catalog items are identified by a unique code. (If the library owns several copies of the same book or recording, each copy has a unique code.) The information for each item includes title, year, and availability. An item is available if it is not checked out. 
- In addition: 
  - The information for a book includes the author and number of pages. 
  - The information for a recording includes the performer and format (CD or tape). 
- The system contains a database of the borrowers. Each borrower has a unique identification code in addition to a name. The system maintains a list, for each borrower, of the catalog items checked out.
- In the library system, the user should be able to:
  - Display the catalog by listing the code, title, and availability of each item. 
  - Display a catalog item. 
  - Display the borrowers by listing the identification code and name of each borrower. 
  - Display the catalog items checked out by a borrower. 
  - Check out a catalog item by adding the item to borrower's list of borrowed items. 
  - Check in a catalog item by removing the item from borrower's list of borrowed items. 

## Identifying Classes

- List all the nouns in the specification. 
- Prune the list: 
  - Convert plural nouns to their singular form. 
  - Eliminate nouns that represent objects. Replace them with generic nouns. For example, use "client" instead of "John Smith." 
  - Eliminate vague nouns. 
  - Eliminate nouns that are class attributes. 
- Group the synonyms and then choose the best name for the class from the group. 
  - For example, "user" and "client" are synonyms. In a bank system, the best name is "client" because the system may have two types of users: the clients and the bank's employees. 
- Select the classes that are relevant to the system. 

- Look for more relevant classes. Search the application domain for: 
  - Physical things. For example, "person," "book," and "computer." 
  - Roles played by persons or organizations. For example, "employer" and "supplier." 
  - Objects that represents an occurrence or event. For example, "system crash," "flight," and "mouse click." 
  - Objects that represent a relationship between other objects in the model. For example, "purchase" (related to "buyer," "seller," and "merchandise") and "marriage" (related to "man" and "woman"). 
  - People who carry out some function. For example, "student" and "clerk." 
  - Places. For example, "library," "classroom," and "bank." 
  - Collections of objects, people, resources, or facilities. For example, "catalog" and "group." 
  - Concepts or ideas that are intangible. For example, "money" and "bank account." 

## Identifying Relationships

- Create an n x n table where n is the number of classes.
- Identify the is-a relationship
- Identify the has-a relationship

## Identifying Attributes

- Look for adjectives and possessive phrases such as "the X of Y" and "Y's X" in the system specification. 
- Use your knowledge of the application domain to define the set of attributes needed for the system being developed. 

## Identifying Methods

- Look for verbs
- Use your knowledge of the application domain to define the set of methods needed for the system being developed.
- If there are any collections held by the object, include the methods needed to add, remove, and access elements of these collections.

## Modeling Using UML

【暂无】

## Implementing the Library System we just designed

下面给的是标准解：

### CatalogItem类

```java
/*!Begin Snippet:file*/
/**
 * This class models a catalog item. It contains the following
 * following information:
 * </p>
 * <ol>
 * <li>the code of the item, a <code>String</code></li>
 * <li>the title of the item, a <code>String</code></li>
 * <li>the year the item was published, an <code>int</code></li>
 * <li>a <code>boolean</code> value that indicates if the item is
 *     available</li>
 * </ol>
 *
 * @author BlankSpace
 * @version  1.0.0
 */
public class CatalogItem {

	/* Code of the item. */
	private String  code;

	/* Title of the item. */
	private String  title;

	/* Year the item was published. */
	private int  year;

	/* Indicates if the item is available */
	private boolean  available;

	/**
	 * Constructs a <code>CatalogItem</code> object.
	 * <p>
	 * Sets the instance variable <code>available</code>
	 * to <code>true</code>.
	 * <p>
	 *
	 * @param initialCode  the code of the item.
	 * @param initialTitle  the title of the item.
	 * @param initialyear  the year the item was published.
	 */
	public CatalogItem(String initialCode, String initialTitle,
			int initialyear) {

		this.code = initialCode;
		this.title = initialTitle;
		this.year = initialyear;
		this.available = true;
	}

	/**
	 * Returns the code of this item.
	 *
	 * @return  the code of this item.
	 */
	public String  getCode()  {

		return  this.code;
	}

	/**
	 * Returns the title of this item.
	 *
	 * @return  the title of this item.
	 */
	public String  getTitle()  {

		return  this.title;
	}

	/**
	 * Returns the year this item was published.
	 *
	 * @return  the year this item was published.
	 */
	public int  getYear()  {

		return  this.year;
	}

	/**
	 * Sets the value of instance variable <code>available</code>.
	 *
	 * @param value  the new value.
	 */
	public void  setAvailable(boolean value)  {

		this.available = value;
	}

	/**
	 * Returns <code>true</code> if the item is available.
	 *
	 * @return  <code>true</code> if the item is available;
	 *          <code>false</code> otherwise.
	 */
	public boolean  isAvailable()  {

		return this.available;
	}

	/**
	 * Returns <code>true</code> if the code of this catalog item is
	 * equal to the code of the argument
	 *
	 * @param object  object with which this catalog item is compared.
	 * @return  <code>true</code> if the code of this catalog item is
	 *          equal to the code of the argument; <code>false</code>
	 *          otherwise.
	 */
	public boolean  equals(Object  object)  {

		return object instanceof CatalogItem
		       && getCode().equals(((CatalogItem) object).getCode());
	}

	/**
	 * Returns the string representation of this catalog item.
	 *
	 * @return  the string representation of this catalog item.
	 */
	public String toString()  {

		return  getCode() + "_" + getTitle() + "_" + getYear()
		        + "_" + isAvailable();
	}
}
/*!End Snippet:file*/
```

### Recording类

```java
/*!Begin Snippet:file*/
/**
 * This class models a recording. It extends {@link CatalogItem} and
 * adds the following information:
 * <ol>
 * <li>the performer of the recording, a <code>String</code></li>
 * <li>the format of the recording, a <code>String</code></li>
 * </ol>
 *
 * @author BlankSpace
 * @version  1.0.0
 * @see CatalogItem
 */
public class Recording extends CatalogItem  {

	/* Performer of the recording. */
	private String  performer;

	/* Format of the recording. */
	private String  format;

	/**
	 * Constructs an <code>Recording</code> object.
	 *
	 * @param initialCode  the code of the catalog item.
	 * @param initialTitle  the title of the catalog item.
	 * @param initialYear  the year of the catalog item.
	 * @param initialPerformer  the performer of the recording.
	 * @param initialFormat  the format of the recording.
	 */
	public Recording(String initialCode, String initialTitle,
			int initialYear, String initialPerformer,
			String initialFormat)  {

		super(initialCode, initialTitle, initialYear);

		this.performer = initialPerformer;
		this.format = initialFormat;
	}

	/**
	 * Returns the performer of this recording.
	 *
	 * @return  the performer of this recording.
	 */
	public String  getPerformer()  {

		return  this.performer;
	}

	/**
	 * Returns the format of this recording.
	 *
	 * @return  the format of this recording.
	 */
	public String  getFormat()  {

		return  this.format;
	}

	/**
	 * Returns the string representation of this recording.
	 *
	 * @return  the string representation of this recording.
	 */
	public String toString()  {

		return  super.toString() + "_" + getPerformer() + "_"
		        + getFormat();
	}
}
/*!End Snippet:file*/
```

### Book类

```java
/*!Begin Snippet:file*/
/**
 * This class models a book. It extends {@link CatalogItem} and
 * adds the following information:
 * <ol>
 * <li>the author of the book, a <code>String</code></li>
 * <li>the number of pages in the book, an <code>int</code></li>
 * </ol>
 *
 * @author BlankSpace
 * @version  1.0.0
 * @see CatalogItem
 */
public class Book extends CatalogItem  {

	/* Author of the book.*/
	private String  author;

	/* Number of pages in the book.*/
	private int  numberOfPages;

	/**
	 * Constructs a <code>Book</code> object.
	 *
	 * @param initialCode  the code of the book.
	 * @param initialTitle  the title of the book.
	 * @param initialYear  the year the book was published.
	 * @param initialAuthor  the author of the book.
	 * @param initialNumberOfPages  the number of pages in the book.
	 */
	public Book(String initialCode, String initialTitle,
	 		int initialYear, String initialAuthor,
			int initialNumberOfPages) {

		super(initialCode, initialTitle, initialYear);

		this.author = initialAuthor;
		this.numberOfPages = initialNumberOfPages;
	}

	/**
	 * Returns the author of this book.
	 *
	 * @return  the author of this book.
	 */
	public String  getAuthor()  {

		return  this.author;
	}

	/**
	 * Returns the number of pages in this book.
	 *
	 * @return  the number of pages in this book.
	 */
	public int  getNumberOfPages()  {

		return  this.numberOfPages;
	}

	/**
	 * Returns the string representation of this book.
	 *
	 * @return  the string representation of this book.
	 */
	public String toString()  {

		return  super.toString() + "_" + getAuthor() + "_"
		        + getNumberOfPages();
	}
}
/*!End Snippet:file*/
```

### BorrowerDatabase类

```java
/*!Begin Snippet:file*/
import java.util.*;
import java.text.*;

/**
 * Maintains a collection of {@link Borrower} objects.
 *
 * @author BlankSpace
 * @version  1.0.0
 * @see Borrower
 */
public class BorrowerDatabase implements Iterable<Borrower> {

	/* Collection of <code>Borrower</code> objects.*/
	private ArrayList<Borrower>  borrowers;

	/**
	 * Constructs an empty collection of {@link Borrower}
	 * objects.
	 */
	public BorrowerDatabase()  {

		this.borrowers = new ArrayList<Borrower>();
	}

	/**
	 * Adds a {@link Borrower} object to this collection.
	 *
	 * @param borrower  the {@link Borrower} object.
	 */
	public void  addBorrower(Borrower borrower)  {

		this.borrowers.add(borrower);
	}

	/**
	 * Returns an iterator over the borrowers in this database.
	 *
	 * return  an {@link Iterator} of {@link Borrower}
	 */
	public Iterator<Borrower>  iterator() {

		return this.borrowers.iterator();
	}

	/**
	 * Returns the {@link Borrower} object with the specified
	 * <code>id</code>.
	 *
	 * @param id  the id of the borrower.
	 * @return  The {@link Borrower} object with the specified id.
	 *          Returns <code>null</code> if the object with the
	 *          id is not found.
	 */
	public Borrower  getBorrower(String id)  {

		for (Borrower borrower : this.borrowers) {
			if (borrower.getId().equals(id)) {

				return borrower;
			}
		}

		return null;
	}

	/**
	 * Returns the number of {@link Borrower} objects in this collection.
	 *
	 * @return  the number of {@link Borrower} objects in this collection.
	 */
	public int  getNumberOfBorrowers()  {

		return this.borrowers.size();
	}
}
/*!End Snippet:file*/
```

### Catalog类

```java
/*!Begin Snippet:file*/
import  java.util.*;
import java.io.*;

/**
 * Maintains the information of a library catalog. Contains a
 * collection of {@link CatalogItem} objects.
 *
 * @author BlankSpace
 * @version  1.0.0
 * @see CatalogItem
 */
public class Catalog implements Iterable<CatalogItem>  {

	/* Collection of <code>CatalogItem</code> objects.*/
	private ArrayList<CatalogItem>  items;

	/**
	 * Constructs an empty catalog.
	 */
	public Catalog() {

		this.items = new ArrayList<CatalogItem>();
	}

	/**
	 * Adds a {@link CatalogItem} object to this catalog.
	 *
	 * @param catalogItem  the {@link CatalogItem} object.
	 */
	public void  addItem(CatalogItem catalogItem)  {

		this.items.add(catalogItem);
	}

	/**
	 * Returns an iterator over the items in this catalog.
	 *
	 * return  an {@link Iterator} of {@link CatalogItem}
	 */
	public Iterator<CatalogItem>  iterator() {

		return this.items.iterator();
	}

	/**
	 * Returns the {@link CatalogItem} object with the specified
	 * <code>code</code>.
	 *
	 * @param code  the code of an item.
	 * @return  The {@link CatalogItem} object with the specified
	 *          code. Returns <code>null</code> if the object with
	 *          the code is not found.
	 */
	public CatalogItem  getItem(String code)  {

		for (CatalogItem catalogItem : this.items) {
			if (catalogItem.getCode().equals(code)) {

				return catalogItem;
			}
		}

		return null;
	}

	/**
	 * Returns the number of items in the catalog.
	 *
	 * @return the number of {@link CatalogItem} objects in this catalog.
	 */
	public int  getNumberOfItems()  {

		return this.items.size();
	}
}
/*!End Snippet:file*/
```

### BorrowedItems类

```java
/*!Begin Snippet:file*/
import java.util.*;
import java.text.*;

/**
 * Maintains a collection of {@link CatalogItem} assigned to a borrower.
 *
 * @author BlankSpace
 * @version  1.0.0
 * @see CatalogItem
 */
public class BorrowedItems implements Iterable<CatalogItem>  {

	/* Catalog items assigned to a borrower.*/
	private ArrayList<CatalogItem>  items;

	/**
	 * Sets the collection of {@link CatalogItem} to empty.
	 */
	public BorrowedItems()  {

		this.items = new ArrayList<CatalogItem>();
	}

	/**
	 * Adds a {@link CatalogItem} object to this collection and
	 * sets the {@link CatalogItem} object as not available.
	 *
	 * @param catalogItem  the {@link CatalogItem} object.
	 */
	public void  addItem(CatalogItem catalogItem)  {

		this.items.add(catalogItem);
		catalogItem.setAvailable(false);
	}

	/**
	 * Removes a {@link CatalogItem} object from this collection
	 * and sets the {@link CatalogItem} object as available.
	 *
	 * @param catalogItem  the {@link CatalogItem} object.
	 */
	public void  removeItem(CatalogItem catalogItem)  {

		this.items.remove(catalogItem);
		catalogItem.setAvailable(true);
	}

	/**
	 * Returns an iterator over the borrowed items in this collection.
	 *
	 * return  an {@link Iterator} of {@link CatalogItem}
	 */
	public Iterator<CatalogItem> iterator() {

		return this.items.iterator();
	}

	/**
	 * Returns the {@link CatalogItem} object with the specified
	 * <code>code</code>.
	 *
	 * @param code  the code of an item.
	 * @return  The {@link CatalogItem} object with the specified
	 *          code. Returns <code>null</code> if the object with
	 *          the code is not found.
	 */
	public CatalogItem  getItem(String code)  {

		for (CatalogItem catalogItem : this.items) {
			if (catalogItem.getCode().equals(code)) {

				return catalogItem;
			}
		}

		return null;
	}

	/**
	 * Returns the number of borrowed items.
	 *
	 * @return  the number of borrowed items.
	 */
	public int  getNumberOfItems()  {

		return this.items.size();
	}
}

/*!End Snippet:file*/
```

### Borrower类

```java
/*!Begin Snippet:file*/
/**
 * This class models a library user. It contains the following
 * information:
 * <ol>
 * <li>The id of the borrower, a <code>String</code></li>
 * <li>The name of the borrower, a <code>String</code></li>
 * <li>The items checked out by the borrower,
 *     a <code>BorrowedItems</code> object</li>
 * </ol>
 *
 * @author BlankSpace
 * @version  1.0.0
 * @see BorrowedItems
 * @see CatalogItem
 */
public class Borrower {

	/* Identification number of the borrower.*/
	private String  id;

	/* Name of the borrower.*/
	private String  name;

	/* Items checked out by the borrower.*/
	private BorrowedItems  borrowedItems;

	/**
	 * Constructs a <code>Borrower</code> object.
	 * <p>
	 * The collection of the borrowed items is initially empty.
	 * </p>
	 *
	 * @param initialId  the id of the borrower.
	 * @param initialName  the name of the borrower.
	 */
	public Borrower(String initialId, String initialName)  {

		this.id = initialId;
		this.name = initialName;
		this.borrowedItems = new BorrowedItems();
	}

	/**
	 * Returns the identification number of this borrower.
	 *
	 * @return  the identification number of this borrower.
	 */
	public String  getId()  {

		return  this.id;
	}

	/**
	 * Returns the name of this borrower.
	 *
	 * @return  the name of this borrower.
	 */
	public String  getName () {

		return  this.name;
	}

	/**
	 * Returns the borrowed items collection.
	 *
	 * @return  a {@link BorrowedItems} object.
	 */
	public BorrowedItems  getBorrowedItems () {

		return  this.borrowedItems;
	}

	/**
	 * Returns <code>true</code> if the id of this borrower is
	 * equal to the id of the argument.
	 *
	 * @param object  object with which this borrower is compared.
	 * @return  <code>true</code> if the id of this borrower is
	 *          equal to the id of the argument; <code>false</code>
	 *          otherwise.
	 */
	public boolean  equals(Object  object)  {

		return object instanceof Borrower
		       && getId().equals(((Borrower) object).getId());
	}

	/**
	 * Returns the string representation of this borrower.
	 *
	 * @return  the string representation of this borrower.
	 */
	public String  toString()  {

		return  getId() + "_" + getName();
	}
}
/*!End Snippet:file*/
```

### LibrarySystem类

```java
/*!Begin Snippet:file*/
import java.io.*;
import java.util.*;

/**
 * This class implements a library system.
 *
 * @author BlankSpace
 * @version 1.1.0
 * @see CatalogItem
 * @see Book
 * @see Recording
 * @see Catalog
 * @see Borrower
 * @see BorrowedItems
 * @see BorrowerDatabase
 */
public class LibrarySystem  {

	private static BufferedReader  stdIn =
		new  BufferedReader(new  InputStreamReader(System.in));
	private static PrintWriter  stdOut = new  PrintWriter(System.out, true);
	private static PrintWriter  stdErr = new  PrintWriter(System.err, true);

	private Catalog  catalog;
	private BorrowerDatabase borrowerDB;

	/**
	 * Loads the information of the library catalog and
	 * borrowers database and starts the application.
	 *
	 * @param args  String arguments.  Not used.
	 * @throws IOException if there are errors in the input.
	 */
	public static void  main(String[]  args) throws IOException  {

		Catalog catalog  = load();

		LibrarySystem  app = new  LibrarySystem(catalog, load(catalog));

		app.run();

	}

	/*
	 * Loads the information of a Catalog object.
	 */
	private static Catalog load ()  {

		Catalog catalog = new Catalog();

		catalog.addItem(new Book("B001", "Effective Java Programming", 2001,
		                         "Joshua Bloch", 252));
		catalog.addItem(new Book("B002", "Design Patterns", 1995,
		                         "Erich Gamma et al", 395));
		catalog.addItem(new Book("B003", "Refactoring", 1999,
		                         "Martin Fowler", 431));
		catalog.addItem(new Book("B004", "The Mythical Man-Month", 1995,
		                         "Frederick P. Brooks", 322));
		catalog.addItem(new Book("B005", "Code Complete", 1993,
		                         "Steve C McConnell", 857));
		catalog.addItem(new Book("B006", "The Psychology of Comp. Progr.", 1998,
		                         "Gerald M. Weinberg", 360));
		catalog.addItem(new Book("B007", "Programming Pearls ", 1999,
		                         "Jon Bentley", 239));
		catalog.addItem(new Book("B008", "The Practice of Programming", 1999,
		                         "Brian W. Kernighan", 257));
		catalog.addItem(new Book("B009", "Peopleware", 1999,
		                         "Tom Demarco", 245));
		catalog.addItem(new Book("B010", "The Java Programming Language", 2000,
		                         "Ken Arnold", 595));
		catalog.addItem(new Book("B011", "Core J2EE Patterns", 2001,
		                         "Deepak Alur", 496));
		catalog.addItem(new Book("B012", "Rapid Development", 1996,
		                         "Steve C McConnell", 680));
		catalog.addItem(new Book("B013", "Applying UML and Patterns", 2001,
		                         "Craig Larman", 656));
		catalog.addItem(new Book("B014", "The Little Schemer", 1995,
		                         "Daniel P. Friedman", 216));
		catalog.addItem(new Book("B015", "Agile Software Development", 2001,
		                         "Alistair Cockburn", 256));

		catalog.addItem(new Recording("R001", "Getz/Gilberto", 1963,
		                              "Stan Getz and Joao Gilberto", "CD"));
		catalog.addItem(new Recording("R002", "Kind of Blue", 1997,
		                              "Miles Davis", "CD"));
		catalog.addItem(new Recording("R003", "Supernatural", 1999,
		                              "Santana", "Tape"));
		catalog.addItem(new Recording("R004", "Private Collection", 1983,
		                              "Jon & Vangelis", "Tape"));
		catalog.addItem(new Recording("R005", "Abbey Road", 1969,
		                              "Beatles", "CD"));
		catalog.addItem(new Recording("R006", "Joshua Tree", 1990,
		                              "U2", "CD"));

		return catalog;
	}

	/*
	 * Loads a BorrowerDatabase object.
	 */
	private static BorrowerDatabase load(Catalog catalog) {

		BorrowerDatabase borrowerDB = new BorrowerDatabase();

		Borrower borrower = new Borrower("ID001", "James Addy");

		borrower.getBorrowedItems().addItem(catalog.getItem("B003"));
		borrower.getBorrowedItems().addItem(catalog.getItem("R001"));
		borrower.getBorrowedItems().addItem(catalog.getItem("B012"));
		borrowerDB.addBorrower(borrower);

		borrower = new Borrower("ID002", "John Doust");
		borrowerDB.addBorrower(borrower);

		borrower = new Borrower("ID003", "Constance Foster");
		borrower.getBorrowedItems().addItem(catalog.getItem("B006"));
		borrowerDB.addBorrower(borrower);

		borrower = new Borrower("ID004", "Harold Gurske");
		borrower.getBorrowedItems().addItem(catalog.getItem("B002"));
		borrowerDB.addBorrower(borrower);

		borrower = new Borrower("ID005", "Mary A. Rogers");
		borrowerDB.addBorrower(borrower);

		borrower = new Borrower("ID006", "Laura Novelle");
		borrower.getBorrowedItems().addItem(catalog.getItem("B007"));
		borrower.getBorrowedItems().addItem(catalog.getItem("B009"));
		borrowerDB.addBorrower(borrower);

		borrower = new Borrower("ID007", "David M. Prescott");
		borrower.getBorrowedItems().addItem(catalog.getItem("B011"));
		borrowerDB.addBorrower(borrower);

		borrower = new Borrower("ID008", "Francis Matthews");
		borrower.getBorrowedItems().addItem(catalog.getItem("R003"));
		borrower.getBorrowedItems().addItem(catalog.getItem("B005"));
		borrowerDB.addBorrower(borrower);

		borrower = new Borrower("ID009", "Thomas Ferris");
		borrowerDB.addBorrower(borrower);

		borrower = new Borrower("ID010", "John Johnson");
		borrower.getBorrowedItems().addItem(catalog.getItem("B004"));
		borrowerDB.addBorrower(borrower);

		return borrowerDB;
	}

	/*
	 * Constructs a <code>LibrarySystem</code> object.
	 * Initialize the catalog and the borrower database with
	 * the values specified in the parameters.
	 */
	private LibrarySystem(Catalog initialCatalog,
	                      BorrowerDatabase initialBorrowerDB) {

		this.catalog = initialCatalog;
		this.borrowerDB = initialBorrowerDB;
	}

	/*
	 * Presents the user with a menu of options and processes the selection.
	 */
	private void run() throws IOException  {

		int  choice = getChoice();

		while (choice != 0)  {

			if (choice == 1)  {
				displayCatalog();
			} else if (choice == 2)  {
				displayCatalogItem();
			} else if (choice == 3)  {
				displayBorrowerDatabase();
			} else if (choice == 4)  {
				displayBorrower();
			} else if (choice == 5)  {
				checkOut();
			} else if (choice == 6)  {
				checkIn();
			}

			choice = getChoice();
		}
	}

	/* Validates the user's choice. */
	private int  getChoice() throws IOException  {

		int  input;

		do  {
			try  {
				stdErr.println();
				stdErr.print("[0]  Quit\n"
				             + "[1]  Display catalog\n"
				             + "[2]  Display catalog item\n"
				             + "[3]  Display borrowers\n"
				             + "[4]  Display borrowed items\n"
				             + "[5]  Check out\n"
				             + "[6]  Check in\n"
				             + "choice> ");
				stdErr.flush();

				input = Integer.parseInt(stdIn.readLine());

				stdErr.println();

				if (0 <= input && 6 >= input)  {
					break;
				} else {
					stdErr.println("Invalid choice:  " + input);
				}
			} catch (NumberFormatException  nfe)  {
				stdErr.println(nfe);
			}
		}  while (true);

		return  input;
	}

	/*
	 * Displays the catalog.
	 */
	private void displayCatalog() {

		if (this.catalog.getNumberOfItems() == 0) {
			stdErr.println("The catalog is empty");
		} else {
			for (CatalogItem item : this.catalog) {
				stdOut.println(item.getCode() + " " + item.getTitle() + " "
				               + (item.isAvailable()? "(A)" : "(NA)"));
			}
		}
	}

	/*
	 * Displays a catalog item.
	 */
	private void displayCatalogItem()  throws IOException  {

		CatalogItem item = readCatalogItem();

		if (item != null) {
			stdOut.println("  Title: " + item.getTitle());
			stdOut.println("  Year: " + item.getYear());
			if (item instanceof Book) {

				Book book = (Book) item;

				stdOut.println("  Author: " + book.getAuthor());
				stdOut.println("  Number of pages: " + book.getNumberOfPages());
			} else if (item instanceof Recording) {

				Recording recording = (Recording) item;

				stdOut.println("  Performer: " + recording.getPerformer());
				stdOut.println("  Format: " + recording.getFormat());
			}
			stdOut.println(
				"  Status: "
				+ (item.isAvailable() ? "Available" : "Not available"));
		} else {
			stdErr.println("There is no catalog item with that code");
		}
	}

	/*
	 * Displays the borrower database.
	 */
	private void displayBorrowerDatabase() {

		if (this.borrowerDB.getNumberOfBorrowers() == 0) {
			stdErr.println("The database of borrowers is empty");
		} else {
			for (Borrower borrower : this.borrowerDB) {
				stdOut.println(borrower.getId() + " " + borrower.getName());
			}
		}
	}

	/*
	 * Displays a borrower.
	 */
	private void displayBorrower()  throws IOException  {

		Borrower borrower = readBorrower();

		if (borrower != null) {

			stdOut.println("  Name: " + borrower.getName());

			BorrowedItems borrowedItems = borrower.getBorrowedItems();

			if (borrowedItems.getNumberOfItems() == 0) {
				stdOut.println("  No items borrowed");
			} else {
				stdOut.println("  Items Borrowed:");
				for (CatalogItem item : borrowedItems) {
					stdOut.println(
						"    " + item.getCode() + " " + item.getTitle());
				}
			}
		} else {
			stdErr.println("There is no borrower with that id");
		}
	}

	/*
	 * Registers the loan of a item to a borrower.
	 */
	private void checkOut()  throws IOException  {

		CatalogItem item = readCatalogItem();

		if (item == null) {
			stdErr.println("There is no catalog item with that code");
		} else if (item.isAvailable()) {

			Borrower borrower = readBorrower();

			if (borrower == null) {
				stdErr.println("There is no borrower with that id");
			} else {
				borrower.getBorrowedItems().addItem(item);
				stdOut.println("The item " + item.getCode()
				               + " has been check out by " + borrower.getId());
			}
		} else {
			stdErr.println("The item " +  item.getCode() +
			               " is not available");
		}
	}

	/*
	 * Registers the return of a item.
	 */
	private void checkIn()  throws IOException  {

		CatalogItem item = readCatalogItem();

		if (item == null) {
			stdErr.println(
				"There is no catalog item with that code");
		} else if (item.isAvailable()) {
			stdErr.println("The item " +  item.getCode() + " is not borrowed");
		} else {

			Borrower borrower = readBorrower();

			if (borrower == null) {
				stdErr.println("There is no borrower with that id");
			} else {
				borrower.getBorrowedItems().removeItem(item);
				stdOut.println("The item " +  item.getCode()
				               + " has been returned");
			}
		}
	}

	/*
	 * Obtains a CatalogItem object  .
	 */
	private  CatalogItem readCatalogItem() throws IOException  {

		stdErr.print("Catalog item code> ");
		stdErr.flush();

		return this.catalog.getItem(stdIn.readLine());
	}

	/*
	 * Obtains a Borrower object  .
	 */
	private  Borrower readBorrower()  throws IOException  {

		stdErr.print("Borrower id> ");
		stdErr.flush();

		return this.borrowerDB.getBorrower(stdIn.readLine());
	}
}
/*!End Snippet:file*/
```
