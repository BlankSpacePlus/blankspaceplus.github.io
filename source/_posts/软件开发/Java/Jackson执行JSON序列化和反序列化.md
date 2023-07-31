---
title: Jackson执行JSON序列化和反序列化
date: 2019-10-05 14:28:59
summary: 本文分享Jackson执行JSON序列化和反序列化的方法。
tags:
- Java
- Jackson
- JSON
categories:
- Java
---

# Java类和JSON

Speaker类：

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Speaker {
	private int id;
	private int age;
	private String fullName;
	private List<String> tags = new ArrayList<>(); 
	private boolean registered;
	
	public Speaker() {
		super();
	}

	public Speaker(int id, int age, String fullName, List<String> tags, boolean registered) {
		super();
		this.id = id;
		this.age = age;
		this.fullName = fullName;
		this.tags = tags;
		this.registered = registered;
	}
	
	public Speaker(int id, int age, String fullName, String[] tags, boolean registered) {
		this(id, age, fullName, Arrays.asList(tags), registered);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public boolean isRegistered() {
		return registered;
	}

	public void setRegistered(boolean registered) {
		this.registered = registered;
	}

	@Override
	public String toString() {
		return String.format("Speaker [id=%s, age=%s, fullName=%s, tags=%s, registered=%s]", id, age, fullName, tags,
				registered);
	}

}
```

JSON文件

speaker.json
```javascript
{
  "id": 1,
  "fullName": "Larson Richard",
  "tags": [
    "JavaScript", "AngularJS", "Yeoman"
  ],
  "age": 39,
  "registered": true
}
```
speakers.json
```javascript
{
  "speakers": [
    {
      "id": 1,
      "fullName": "Larson Richard",
      "tags": [
        "JavaScript",
        "AngularJS",
        "Yeoman"
      ],
      "age": 39,
      "registered": true
    },
    {
      "id": 2,
      "fullName": "Ester Clements",
      "tags": [
        "REST",
        "Ruby on Rails",
        "APIs"
      ],
      "age": 29,
      "registered": true
    },
    {
      "id": 3,
      "fullName": "Christensen Fisher",
      "tags": [
        "Java",
        "Spring",
        "Maven",
        "REST"
      ],
      "age": 45,
      "registered": false
    }
  ]
}
```

# 对Java简单数据类型进行序列化/反序列化操作

这里的简单数据类型是指：
 - 整数型
 - 字符串
 - 数组
 - 布尔值

下面的单元测试程序应用了Jackson和JUnit4对Java中的简单数据类型进行序列化/反序列化操作：
```java
import static org.junit.Assert.*;

import java.io.*;
import java.util.*;

import org.junit.Test;

import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.core.type.*;
import com.fasterxml.jackson.databind.*;

public class BasicJsonTypesTest {

  private static final String TEST_SPEAKER = "age = 39\n" + 
	   "fullName = \"Larson Richard\"\n" +
	   "tags = [\"JavaScript\",\"AngularJS\",\"Yeoman\"]\n" + 
		 "registered = true";

	@Test
	public void serializeBasicTypes() {
		try {
			ObjectMapper mapper = new ObjectMapper();
			Writer writer = new StringWriter();
			int age = 39;
			String fullName = new String("Larson Richard");
			List<String> tags = new ArrayList<String>(
					Arrays.asList("JavaScript", "AngularJS", "Yeoman"));

			boolean registered = true;
			String speaker = null;

			writer.write("age = ");
			mapper.writeValue(writer, age);
			writer.write("\nfullName = ");
			mapper.writeValue(writer, fullName);
			writer.write("\ntags = ");
			mapper.writeValue(writer, tags);
			writer.write("\nregistered = ");
			mapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			mapper.writeValue(writer, registered);
			speaker = writer.toString();
			System.out.println(speaker);
			assertTrue(TEST_SPEAKER.equals(speaker));
			assertTrue(true);
		} catch (JsonGenerationException jge) {
			jge.printStackTrace();
			fail(jge.getMessage());
		} catch (JsonMappingException jme) {
			jme.printStackTrace();
			fail(jme.getMessage());
		} catch (IOException ioe) {
			ioe.printStackTrace();
			fail(ioe.getMessage());
		}
	}

	@Test
	public void deSerializeBasicTypes() {
		try {
			String ageJson = "{ \"age\": 39 }";
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Integer> ageMap = mapper.readValue(ageJson,
					                        new TypeReference<HashMap<String,Integer>>() {});

			Integer age = ageMap.get("age");
			 
			System.out.println("age = " + age + "\n\n\n");
			assertEquals(39, age.intValue());
      assertTrue(true);
		} catch (JsonMappingException jme) {
			jme.printStackTrace();
			fail(jme.getMessage());
		} catch (IOException ioe) {
			ioe.printStackTrace();
			fail(ioe.getMessage());
		}
	}
	
}
```

在上面的实例中，由于@Test注解的声明，JUnit会将serializeBasicTypes()和deSerializeBasicTypes()方法作为测试的一部分来运行。对于JSON数据自身来说，这些单元测试用例并未执行太多断言操作。

归纳一下，以下是Jackson中用于JSON序列化/反序列化的一些重要的类和方法：

 - ObjectMapper 类负责在Java和JSON之间进行相互转换。
 - ObjectMapper.writeValue() 方法负责将Java数据类型转换为JSON（本例中转换结果被输出到Writer对象中）。
 - ObjectMapper.readValue() 方法负责阿静JSON转换为Java数据结构。

# 对Java对象进行序列化/反序列化操作

如果只是对简单数据类型进行序列化/反序列化，并没有什么有趣的功能。下面是对Java对象进行的操作，这时序列化/反序列化显得比较有用。

下面的程序展示了如何用Jackson来序列化/反序列化speaker对象，同时也展示了如何将JSON文件反序列化为多个speaker对象：

```java
import static org.junit.Assert.*;

import java.io.*;
import java.net.*;
import java.util.*;

import org.junit.Test;

import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.type.*;

public class SpeakerJsonFlatFileTest {

	private static final String SPEAKER_JSON_FILE_NAME = "speaker.json";
	private static final String SPEAKERS_JSON_FILE_NAME = "speakers.json";
	private static final String TEST_SPEAKER_JSON = "{\n" + 
      "  \"id\" : 1,\n" + 
      "  \"age\" : 39,\n" + 
      "  \"fullName\" : \"Larson Richard\",\n" + 
      "  \"tags\" : [ \"JavaScript\", \"AngularJS\", \"Yeoman\" ],\n" + 
      "  \"registered\" : true\n" + 
    "}";

	@Test
	public void serializeObject() {
		try {
			ObjectMapper mapper = new ObjectMapper();
			String[] tags = {"JavaScript", "AngularJS", "Yeoman"};
			Speaker speaker = new Speaker(1, 39, "Larson Richard", tags, true);
			String speakerStr = null;

			mapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			speakerStr = mapper.writeValueAsString(speaker);	
			System.out.println(speakerStr);
			assertTrue(TEST_SPEAKER_JSON.equals(speakerStr));
			assertTrue(true);
		} catch (JsonGenerationException jge) {
			jge.printStackTrace();
			fail(jge.getMessage());
		} catch (JsonMappingException jme) {
			jme.printStackTrace();
			fail(jme.getMessage());
		} catch (IOException ioe) {
			ioe.printStackTrace();
			fail(ioe.getMessage());
		}
	}

	private File getSpeakerFile(String speakerFileName) throws URISyntaxException {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		URL fileUrl = classLoader.getResource(speakerFileName);
		URI fileUri = new URI(fileUrl.toString());
		File speakerFile = new File(fileUri);

		return speakerFile;
	}

	@Test
	public void deSerializeObject() {
		try {
			ObjectMapper mapper = new ObjectMapper();
			File speakerFile = getSpeakerFile(
										SpeakerJsonFlatFileTest.SPEAKER_JSON_FILE_NAME);

			Speaker speaker = mapper.readValue(speakerFile, Speaker.class);

			System.out.println("\n" + speaker + "\n");
			assertEquals("Larson Richard", speaker.getFullName());
			assertEquals(39, speaker.getAge());		
			assertTrue(true);
		} catch (URISyntaxException use) {
			use.printStackTrace();
			fail(use.getMessage());
		} catch (JsonParseException jpe) {
			jpe.printStackTrace();
			fail(jpe.getMessage());
		} catch (JsonMappingException jme) {
			jme.printStackTrace();
			fail(jme.getMessage());
		} catch (IOException ioe) {
			ioe.printStackTrace();
			fail(ioe.getMessage());
		}
	}

	@Test
	public void deSerializeMultipleObjects() {
		try {
			ObjectMapper mapper = new ObjectMapper();
			File speakersFile = getSpeakerFile(
							SpeakerJsonFlatFileTest.SPEAKERS_JSON_FILE_NAME);

			JsonNode arrNode = mapper.readTree(speakersFile).get("speakers");
			List<Speaker> speakers = new ArrayList<Speaker>();
			if (arrNode.isArray()) {
			    for (JsonNode objNode : arrNode) {
			        System.out.println(objNode);
			        speakers.add(mapper.convertValue(objNode, Speaker.class));
			    }
			}

			assertEquals(3, speakers.size());
			System.out.println("\n\n\nAll Speakers\n");
			for (Speaker speaker: speakers) {
				System.out.println(speaker);
			}

			System.out.println("\n");
			Speaker speaker3 = speakers.get(2);
			assertEquals("Christensen Fisher", speaker3.getFullName());
			assertEquals(45, speaker3.getAge());	
			assertTrue(true);
		} catch (URISyntaxException use) {
			use.printStackTrace();
			fail(use.getMessage());
		} catch (JsonParseException jpe) {
			jpe.printStackTrace();
			fail(jpe.getMessage());
		} catch (JsonMappingException jme) {
			jme.printStackTrace();
			fail(jme.getMessage());
		} catch (IOException ioe) {
			ioe.printStackTrace();
			fail(ioe.getMessage());
		}
	}

}
```

之前的测试用例均使用了JUnit中的断言方法来测试JSON序列化/反序列化的结果。

对于以上的JUnit单元测试，以下几点值得一提：
 - serializeObject()方法创建了一个Speaker对象，然后使用ObjectMapper.writeValueAsString()和System.out.println()将其序列化并打印到标准输出。测试代码将SerializationFeature、INDENT_OUTPUT设置为true，以优化JSON输出中的缩进和显示。
 - deSerializeObject()方法调用getSpeakerFile()来读取包含speaker对象的JSON输入文件，然后使用ObjectMapper.readValue()将其反序列化为SpeakerJava对象。
 - deSerializeMultipleObjects()方法执行了以下操作：
    - 调用getSpeakerFile()来读取包含speaker对象数组的JSON输入文件。
    - 调用ObjectMapper.readTree()来获取JsonNode对象，该对象指向文件中的JSON文档的根结点。
    - 访问JSON树中的每个结点，并使用ObjectMapper.convertValue()方法将结点中的speaker数据反序列化为Java中的Speaker对象。
    - 打印列表中的所有Speaker对象。
 - getSpeakerFile()方法会查找类路径中相应的文件，并执行以下操作：
   - 从当前执行线程获取ContextClassLoader对象。
   - 使用ClassLoader.getResource()方法从当前类路径中查找相关文件资源。
   - 根据文件名的URI创建FIle对象。
