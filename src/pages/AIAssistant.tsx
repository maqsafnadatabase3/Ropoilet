
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Copy, Download, Sparkles, Code, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeBlocks?: { language: string; code: string }[];
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI-powered Lua scripting assistant. I can help you write, debug, and optimize scripts for your Roblox games. What would you like to work on today?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  // Sample script templates
  const scriptTemplates = [
    {
      name: 'Player Join Handler',
      description: 'Basic script to handle player joining events',
      code: `local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    print(player.Name .. " has joined the game!")
    
    -- Create leaderstats
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player
    
    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = leaderstats
end)`
    },
    {
      name: 'Part Touch Detector',
      description: 'Script to detect when a player touches a part',
      code: `local part = script.Parent

part.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        local player = game.Players:GetPlayerFromCharacter(hit.Parent)
        if player then
            print(player.Name .. " touched the part!")
            -- Add your logic here
        end
    end
end)`
    },
    {
      name: 'GUI Button Handler',
      description: 'Basic GUI button click handler',
      code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local screenGui = playerGui:WaitForChild("ScreenGui")
local button = screenGui:WaitForChild("TextButton")

button.MouseButton1Click:Connect(function()
    print("Button was clicked!")
    -- Add your button logic here
end)`
    }
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use the AI assistant.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // This would be the actual OpenAI API call
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant specialized in Roblox Lua scripting. Provide clear, well-commented code examples and explanations. Always consider Roblox-specific APIs and best practices.'
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: input.trim() }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const assistantResponse = data.choices[0].message.content;

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard.",
    });
  };

  const useTemplate = (template: typeof scriptTemplates[0]) => {
    setInput(`Create a script based on this template: ${template.name}\n\n${template.description}\n\nStarting code:\n\`\`\`lua\n${template.code}\n\`\`\``);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Script Assistant</h1>
          <p className="text-gray-400 mt-2">Powered by OpenAI GPT-4 for Roblox Lua development</p>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <Badge className="bg-purple-600 text-white">AI Powered</Badge>
        </div>
      </div>

      {/* API Key Input */}
      {!apiKey && (
        <Card className="bg-yellow-900/20 border-yellow-600/50">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              API Key Required
            </CardTitle>
            <CardDescription className="text-yellow-300">
              Enter your OpenAI API key to start using the AI assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Button onClick={() => toast({ title: "API Key Set", description: "You can now use the AI assistant!" })}>
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Script Templates */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Quick Templates
              </CardTitle>
              <CardDescription className="text-gray-400">
                Start with common script patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {scriptTemplates.map((template, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                  onClick={() => useTemplate(template)}
                >
                  <h4 className="text-white font-medium text-sm">{template.name}</h4>
                  <p className="text-gray-400 text-xs mt-1">{template.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-800 border-gray-700 h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-white">Chat with AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.role === 'assistant' && message.content.includes('```') && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 border-gray-600 text-gray-300 hover:bg-gray-600"
                          onClick={() => copyToClipboard(message.content)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy Code
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-100 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                        <span>AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Ask me to write, debug, or explain Lua scripts for Roblox..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white resize-none"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
